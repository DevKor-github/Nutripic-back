import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './diary.repository';
import { AwsModule } from '../aws/aws.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AwsModule],
  controllers: [DiaryController],
  providers: [PrismaService, DiaryService, DiaryRepository],
})
export class DiaryModule {}
