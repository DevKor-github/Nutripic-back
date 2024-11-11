import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}
  private logger: Logger = new Logger(DiaryController.name);

  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllDiary(@User() uid: string) {
    return this.diaryService.getDiaryByUser(uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('/:diaryId')
  @HttpCode(HttpStatus.OK)
  getDiary(@User() uid: string, @Param() diaryId: string) {
    return this.diaryService.getDiaryById(uid, diaryId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  createDiary(@User() uid: string) {
    return this.diaryService.createDiary(uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch('/update/:diaryId')
  @HttpCode(HttpStatus.OK)
  updateDiary(@User() uid: string, @Param('diaryId') diaryId: string) {
    return this.diaryService.updateDiary(uid, diaryId);
  }
}
