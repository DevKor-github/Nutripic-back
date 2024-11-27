import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { Public } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { AwsService } from '../aws/aws.service';

@Public()
@Controller('diary')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly awsService: AwsService
  ) {}
  private logger: Logger = new Logger(DiaryController.name);

  /**
   * TEST API
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  diaryTest() {
    this.logger.log('Diary API Test');
    return 'Diary API Test';
  }

  @Get('calendar/:index')
  @HttpCode(HttpStatus.OK)
  getAllDiary(
    @User() uid: string,
    @Param('index', ParseIntPipe) index: number
  ): Promise<GetAllDiaryResDto[]> {
    this.logger.log(`Get All Diary by user: ${uid}`);
    return this.diaryService.getDiaryByUser(uid, index);
  }

  @Get('/:diaryId')
  @HttpCode(HttpStatus.OK)
  getDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<GetDiaryResDto> {
    this.logger.log(`Get Diary by id: ${diaryId}`);
    return this.diaryService.getDiaryById(diaryId);
  }

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async createDiary(
    @User() uid: string,
    @Body() createDiaryReqDto: CreateDiaryReqDto
  ): Promise<void> {
    this.logger.log('Create Diary');

    return this.diaryService.createDiary(uid, createDiaryReqDto);
  }

  @Patch('/update/:diaryId')
  @HttpCode(HttpStatus.OK)
  updateDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number,
    @Body() updateDiaryReqDto: UpdateDiaryReqDto
  ): Promise<UpdateDiaryResDto> {
    this.logger.log('Update Diary');
    return this.diaryService.updateDiary(diaryId, updateDiaryReqDto);
  }

  @Get('/get-signed-url/:fileName')
  @HttpCode(HttpStatus.OK)
  getSignedUrl(@Param() fileName: string): Promise<string> {
    this.logger.log('Get Signed URL');
    return this.awsService.getPresignedUrl(fileName);
  }

  @Delete('/delete/:diaryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<void> {
    this.logger.log('Delete Diary');
    await this.diaryService.getDiaryById(diaryId);
    return this.diaryService.deleteDiary(diaryId);
  }

  @Patch('/restore/:diaryId')
  @HttpCode(HttpStatus.OK)
  async restoreDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<UpdateDiaryResDto> {
    this.logger.log('Restore Diary');
    await this.diaryService.getDiaryById(diaryId);
    return this.diaryService.restoreDiary(diaryId);
  }
}
