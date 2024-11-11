import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [DiaryService, PrismaService],
})
export class DiaryModule {}
