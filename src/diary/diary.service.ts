import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { CreateDiaryReqDto, CreateDiaryResDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';

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

    return Promise.all(
      (
        await this.diaryRepository.getDiaryByUser(
          userId,
          targetYear,
          targetMonth
        )
      ).map(async (diary) => {
        const url = await this.diaryRepository
          .getUrlById(diary.id)
          .then((url) => {
            if (!url) return { url: undefined };
            return url;
          });
        return {
          id: diary.id,
          url: url.url,
          createdAt: diary.createdAt,
        };
      })
    ).then((diary: GetAllDiaryResDto[]) => {
      return diary;
    });
  }

  async getDiaryById(diaryId: number): Promise<GetDiaryResDto> {
    return await this.diaryRepository
      .getDiaryById(diaryId)
      .then(async (diary) => {
        const urls = (await this.diaryRepository.getAllUrlById(diaryId)).map(
          (element) => {
            return element.url;
          }
        );
        return {
          id: diary.id,
          body: diary.body,
          urls: urls,
        };
      });
  }

  async createDiary(
    userId: string,
    body: string,
    urls: string[]
  ): Promise<CreateDiaryResDto> {
    return (await this.diaryRepository
      .createDiary(userId, body, urls)
      .catch((err) => {
        if (err) throw new InternalServerErrorException(err);
      })) as CreateDiaryResDto;
  }

  async updateDiary(
    diaryId: number,
    updateDiaryReqDto: UpdateDiaryReqDto
  ): Promise<UpdateDiaryResDto> {
    const diary = await this.diaryRepository.getDiaryById(diaryId);
    if (!diary)
      throw new NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');

    const { body } = updateDiaryReqDto;
    return await this.diaryRepository.updateDiary(diaryId, body);
  }
}
