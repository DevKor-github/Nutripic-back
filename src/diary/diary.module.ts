import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiaryRepository } from './diary.repository';
import { DiaryController } from './diary.controller';

@Module({
  controllers: [DiaryController],
  providers: [PrismaService, DiaryService, DiaryRepository],
})
export class DiaryModule {}
