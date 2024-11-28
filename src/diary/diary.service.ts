import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  private logger: Logger = new Logger(DiaryService.name);

  async getDiaryByUser(
    userId: string,
    index: number
  ): Promise<GetAllDiaryResDto[]> {
    const today = new Date();
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

  async getDiaryById(
    diaryId: number,
    userId?: string
  ): Promise<GetDiaryResDto> {
    const diary = await this.diaryRepository.getDiaryById(diaryId);
    if (!diary)
      throw new NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');
    if (userId && diary.userId !== userId)
      throw new ForbiddenException(
        '해당 다이어리에 대한 접근 권한이 없습니다.'
      );
    return {
      id: diary.id,
      body: diary.body,
      url: diary.url,
      date: diary.date,
    };
  }

  async createDiary(
    userId: string,
    createDiaryReqDto: CreateDiaryReqDto
  ): Promise<void> {
    const { body, date, url } = createDiaryReqDto;
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

  async deleteDiary(diaryId: number): Promise<void> {
    const diary = await this.diaryRepository.deleteDiary(diaryId);
    if (!diary || diary.isDeleted === false)
      throw new BadGatewayException('다이어리 삭제에 실패했습니다.');
  }

  async restoreDiary(diaryId: number): Promise<UpdateDiaryResDto> {
    const diary = await this.diaryRepository.restoreDiary(diaryId);
    if (!diary || diary.isDeleted === true)
      throw new BadGatewayException('다이어리 복구에 실패했습니다.');
    return {
      id: diary.id,
      body: diary.body,
      url: diary.url,
      date: diary.date,
    };
  }
}
