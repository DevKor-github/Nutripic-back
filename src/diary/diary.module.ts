import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiaryRepository } from './diary.repository';
import { DiaryController } from './diary.controller';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [DiaryController],
  providers: [PrismaService, DiaryService, DiaryRepository],
})
export class DiaryModule {}
