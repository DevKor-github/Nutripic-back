import { Injectable } from '@nestjs/common';
import { Diary } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiaryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getDiaryById(diaryId: number): Promise<Diary> {
    return await this.prisma.diary.findUnique({
      where: {
        id: diaryId,
      },
    });
  }

  async getDiaries(
    userId: string,
    year: number,
    month: number,
    day: number | null
  ): Promise<Diary[]> {
    return day
      ? await this.prisma.diary.findMany({
          where: {
            userId: userId,
            date: {
              equals: new Date(year, month, day),
            },
            isDeleted: false,
          },
        })
      : await this.prisma.diary.findMany({
          where: {
            userId: userId,
            date: {
              gte: new Date(year, month, 1),
              lt: new Date(year, month + 1, 1), // 해당 년월에 생성된 다이어리
            },
            isDeleted: false,
          },
        });
  }

  createDiary(
    userId: string,
    body: string,
    url: string,
    date: Date
  ): Promise<Diary> {
    return this.prisma.diary.create({
      data: {
        userId: userId,
        body: body,
        url: url,
        date: date,
      },
    });
  }

  async updateDiary(diaryId: number, body: string, date: Date): Promise<Diary> {
    return await this.prisma.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        body: body,
        date: date,
      },
    });
  }

  async deleteDiary(diaryId: number): Promise<Diary> {
    return await this.prisma.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async restoreDiary(diaryId: number): Promise<Diary> {
    return await this.prisma.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });
  }
}
