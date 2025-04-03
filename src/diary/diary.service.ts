import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import { GetDailyDiaryResDto } from './dto/getDailyDiary.dto';

const indexToMonth = (
  index: number
): { targetYear: number; targetMonth: number } => {
  const today = new Date();
  const targetDate = new Date(today.setMonth(today.getMonth() - index));
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  return { targetYear: targetYear, targetMonth: targetMonth };
};

@Injectable()
export class DiaryService {
  constructor(private diaryRepository: DiaryRepository) {}
  private logger: Logger = new Logger(DiaryService.name);

  async getDiaryByUser(
    userId: string,
    index: number
  ): Promise<GetAllDiaryResDto[]> {
    const { targetYear, targetMonth } = indexToMonth(index);

    const diaries = await this.diaryRepository.getDiaries(
      userId,
      targetYear,
      targetMonth,
      null
    );
    return diaries.map((diary) => ({
      id: diary.id,
      url: diary.url,
      date: diary.date,
    }));
  }

  async getDiaryByDay(
    userId: string,
    index: number,
    day: number
  ): Promise<GetDailyDiaryResDto[]> {
    const { targetYear, targetMonth } = indexToMonth(index);

    const diaries = await this.diaryRepository.getDiaries(
      userId,
      targetYear,
      targetMonth,
      day
    );
    return diaries.map((diary) => 
      ({
        id: diary.id,
        url: diary.url,
        mealTime: diary.mealTime,
        date: diary.date,
      })
    );
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
      mealTime: diary.mealTime,
      date: diary.date,
    };
  }

  async createDiary(
    userId: string,
    createDiaryReqDto: CreateDiaryReqDto
  ): Promise<void> {
    const { body, date, url, mealTime } = createDiaryReqDto;
    const diary = await this.diaryRepository.createDiary(
      userId,
      body,
      url,
      mealTime,
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

    const { body, date, mealTime } = updateDiaryReqDto;

    const updatedDiary = await this.diaryRepository.updateDiary(
      diaryId,
      body,
      mealTime,
      new Date(date)
    );

    if (!updatedDiary)
      throw new BadGatewayException('다이어리 수정에 실패했습니다.');

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
      mealTime: diary.mealTime,
    };
  }
}

