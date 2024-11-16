import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { Public } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { CreateDiaryReqDto, CreateDiaryResDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { AwsService } from '../aws/aws.service';
import { FilesInterceptor } from '@nestjs/platform-express';

// @Public()
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

  @Get('/:index')
  @HttpCode(HttpStatus.OK)
  getAllDiary(
    @User() uid: string,
    @Param('index') index: number
  ): Promise<GetAllDiaryResDto[]> {
    this.logger.log(`Get All Diary by user: ${uid}`);
    return this.diaryService.getDiaryByUser(uid, index);
  }

  @Get('/:diaryId')
  @HttpCode(HttpStatus.OK)
  getDiary(@Param('diaryId') diaryId: number): Promise<GetDiaryResDto> {
    this.logger.log(`Get Diary by id: ${diaryId}`);
    return this.diaryService.getDiaryById(diaryId);
  }

  /**
   * TODO: pre-signed-url을 활용한 이미지 업로드 로직 추가
   *
   * 의논할 점
   * 1. 하루에 등록할 수 있는 다이어리의 개수를 제한할 필요가 있을까요?
   * 2. 한번에 등록할 수 있는 이미지는 몇개까지로 생각하시나요?
   */
  @Post('/add')
  @UseInterceptors(FilesInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async createDiary(
    @User() uid: string,
    @Body() data: string, // 파일과 동시에 업로드하는 multipart/form-data 형식의 데이터를 받기 위해 data: {"body": ...} 형식의 string으로 받음
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<CreateDiaryResDto> {
    this.logger.log('Create Diary');
    const createDiaryReqDto: CreateDiaryReqDto = JSON.parse(data['data']);
    const { body } = createDiaryReqDto;

    return await this.awsService.uploadFiles(uid, files).then(async (urls) => {
      return await this.diaryService.createDiary(uid, body, urls);
    });
  }

  @Patch('/update/:diaryId')
  @HttpCode(HttpStatus.OK)
  updateDiary(
    @Param('diaryId') diaryId: number,
    @Body() updateDiaryReqDto: UpdateDiaryReqDto
  ): Promise<UpdateDiaryResDto> {
    this.logger.log('Update Diary');
    return this.diaryService.updateDiary(diaryId, updateDiaryReqDto);
  }
}
