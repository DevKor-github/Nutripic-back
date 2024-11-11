import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DiaryService {
  constructor() {}
  private logger: Logger = new Logger(DiaryService.name);

  async getDiaryByUser(userId: string) {}

  async getDiaryById(userId: string, diaryId: string) {}

  async createDiary(userId: string) {}

  async updateDiary(userId: string, diaryId: string) {}
}
