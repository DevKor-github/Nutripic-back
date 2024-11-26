import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  private logger: Logger = new Logger(DiaryService.name);

  async getDiaryByUser(
    userId: string,
    index: number
  ): Promise<GetAllDiaryResDto[]> {
    const today = new Date();
    // 만일 전송속도로 인해 월이 넘어가는 때에 클라이언트의 요청을 받게되어 다음달(잘못된)) 데이터를 반환하게 된다면..?
    // 그것을 대비해 차라리 클라이언트에서 요청을 보낸 시각을 기준으로 데이터를 반환하는 것이 더 안전하겠죠?
    const targetDate = new Date(today.setMonth(today.getMonth() - index));
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    const diaries = await this.diaryRepository.getDiaryByUser(
      userId,
      targetYear,
      targetMonth
    );
    return diaries.map((diary) => ({
      id: diary.id,
      url: diary.url,
      date: diary.date,
    }));
  }

  async getDiaryById(diaryId: number): Promise<GetDiaryResDto> {
    const diary = await this.diaryRepository.getDiaryById(diaryId);
    if (!diary)
      throw new NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');
    return {
      id: diary.id,
      body: diary.body,
      url: diary.url,
      date: diary.date,
    };
  }

  async createDiary(
    userId: string,
    createDiaryReqDto: CreateDiaryReqDto,
    url: string
  ): Promise<void> {
    const { body, date } = createDiaryReqDto;
    const diary = await this.diaryRepository.createDiary(
      userId,
      body,
      url,
      new Date(date)
    );
    if (!diary) throw new BadGatewayException('다이어리 생성에 실패했습니다.');
    return;
  }

  async updateDiary(
    diaryId: number,
    updateDiaryReqDto: UpdateDiaryReqDto
  ): Promise<UpdateDiaryResDto> {
    const diary = await this.diaryRepository.getDiaryById(diaryId);
    if (!diary)
      throw new NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');

    const { body, date } = updateDiaryReqDto;

    const updatedDiary = await this.diaryRepository.updateDiary(
      diaryId,
      body,
      new Date(date)
    );

    if (!updatedDiary)
      throw new BadGatewayException('다이어리 업데이트에 실패했습니다.');

    return {
      id: updatedDiary.id,
      body: updatedDiary.body,
      url: updatedDiary.url,
      date: updatedDiary.date,
    } as UpdateDiaryResDto;
  }
}
