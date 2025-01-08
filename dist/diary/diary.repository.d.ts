import { Diary } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class DiaryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDiaryById(diaryId: number): Promise<Diary>;
    getDiaryByUser(userId: string, year: number, month: number): Promise<Diary[]>;
    createDiary(userId: string, body: string, url: string, date: Date): Promise<Diary>;
    updateDiary(diaryId: number, body: string, date: Date): Promise<Diary>;
    deleteDiary(diaryId: number): Promise<Diary>;
    restoreDiary(diaryId: number): Promise<Diary>;
}
