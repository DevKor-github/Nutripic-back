import { Injectable } from '@nestjs/common';
import { Diary } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiaryResDto } from './dto/createDiary.dto';

@Injectable()
export class DiaryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getDiaryById(diaryId: number): Promise<{ id: number; body: string }> {
    return await this.prisma.diary.findUnique({
      select: { id: true, body: true },
      where: {
        id: diaryId,
      },
    });
  }

  async getDiaryByUser(
    userId: string,
    year: number,
    month: number
  ): Promise<Diary[]> {
    return await this.prisma.diary.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(year, month, 1),
          lt: new Date(year, month + 1, 1), // 해당 년월에 생성된 다이어리
        },
      },
    });
  }

  /**
   * 캘린더 월간 화면에서 미리보기를 위한 diaryId에 해당하는 이미지 url 한 개를 반환
   * @param {number} diaryId
   * @returns {( { url: string } | null )}
   */
  async getUrlById(diaryId: number): Promise<{ url: string } | null> {
    return await this.prisma.diaryImage.findFirst({
      select: { url: true },
      where: {
        diaryId: diaryId,
      },
    });
  }

  /**
   * 다이어리 상세 정보 조회를 위한 모든 이미지 url 반환
   * @param {number} diaryId
   * @returns {( { url: string }[] )}
   *
   */
  async getAllUrlById(diaryId: number): Promise<{ url: string }[]> {
    return await this.prisma.diaryImage.findMany({
      select: { url: true },
      where: {
        diaryId: diaryId,
      },
    });
  }

  /**
   * TODO: pre-signed-url을 db에 저장하는 로직 추가
   */
  async createDiary(
    userId: string,
    body: string,
    urls: string[]
  ): Promise<CreateDiaryResDto> {
    return await this.prisma.diary
      .create({
        data: {
          userId: userId,
          body: body,
          createdAt: new Date(),
        },
      })
      .then((diary) => {
        urls.forEach(async (url) => {
          await this.prisma.diaryImage.create({
            data: {
              diaryId: diary.id,
              url: url,
            },
          });
        });
        return {
          id: diary.id,
          url: urls,
        };
      });
  }

  async updateDiary(diaryId: number, body: string) {
    return await this.prisma.diary.update({
      where: {
        id: diaryId,
      },
      data: {
        body: body,
      },
    });
  }
}
