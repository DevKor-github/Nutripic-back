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
import { User } from 'src/utils/decorator/user.decorator';
import { DiaryService } from './diary.service';
import { AwsService } from '../aws/aws.service';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
import {
  ApiBadGatewayResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetDailyDiaryResDto } from './dto/getDailyDiary.dto';

@ApiTags('Diary')
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

  @ApiOperation({ summary: '특정 유저의 모든 다이어리 조회' })
  @ApiParam({
    name: 'index',
    required: true,
    description: '현재 월을 기준으로 캘린더를 앞뒤로 넘긴 횟수',
    example: 0,
  })
  @ApiOkResponse({
    type: GetAllDiaryResDto,
    isArray: true,
  })
  @Get('calendar/:index')
  @HttpCode(HttpStatus.OK)
  getAllDiary(
    @User() uid: string,
    @Param('index', ParseIntPipe) index: number
  ): Promise<GetAllDiaryResDto[]> {
    this.logger.log(`Get All Diary by user: ${uid}`);
    return this.diaryService.getDiaryByUser(uid, index);
  }

  @HttpCode(HttpStatus.OK)
  getDailyDiary(
    @User() uid: string,
    @Param('date') date: string
  ): Promise<GetDailyDiaryResDto[]> {
    this.logger.log(`Get Daily Diary by date and user ${uid}, ${date}`);
    return;
  }

  @ApiOperation({ summary: '특정 다이어리 조회' })
  @ApiParam({
    name: 'diaryId',
    required: true,
    description: '특정 다이어리의 ID',
    example: 7,
  })
  @ApiOkResponse({
    type: GetDiaryResDto,
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
    example: {
      statusCode: 404,
      message: '해당 ID의 다이어리가 존재하지 않습니다',
      error: 'Not Found',
    },
  })
  @Get('/:diaryId')
  @HttpCode(HttpStatus.OK)
  getDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<GetDiaryResDto> {
    this.logger.log(`Get Diary by id: ${diaryId}`);
    return this.diaryService.getDiaryById(diaryId);
  }

  @ApiOperation({ summary: '다이어리 생성' })
  @ApiConsumes('application/json')
  @ApiBody({
    description: '다이어리 본문, 등록일자, 이미지 URL',
    type: CreateDiaryReqDto,
  })
  @ApiCreatedResponse({
    description: '다이어리 생성 성공',
  })
  @ApiBadGatewayResponse({
    description: '다이어리 생성 실패',
    example: {
      statusCode: 502,
      message: '다이어리 생성에 실패했습니다.',
      error: 'Bad Gateway',
    },
  })
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async createDiary(
    @User() uid: string,
    @Body() createDiaryReqDto: CreateDiaryReqDto
  ): Promise<void> {
    this.logger.log('Create Diary');

    return this.diaryService.createDiary(uid, createDiaryReqDto);
  }

  @ApiOperation({ summary: '다이어리 수정' })
  @ApiParam({
    name: 'diaryId',
    required: true,
    description: '특정 다이어리의 ID',
    example: 7,
  })
  @ApiBody({
    type: UpdateDiaryReqDto,
  })
  @ApiOkResponse({
    description: '다이어리 수정 성공',
    type: UpdateDiaryResDto,
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
    example: {
      statusCode: 404,
      message: '해당 ID의 다이어리가 존재하지 않습니다.',
      error: 'Not Found',
    },
  })
  @ApiBadGatewayResponse({
    description: '다이어리 수정 실패',
    example: {
      statusCode: 502,
      message: '다이어리 수정에 실패했습니다.',
      error: 'Bad Gateway',
    },
  })
  @Patch('/update/:diaryId')
  @HttpCode(HttpStatus.OK)
  updateDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number,
    @Body() updateDiaryReqDto: UpdateDiaryReqDto
  ): Promise<UpdateDiaryResDto> {
    this.logger.log('Update Diary');
    return this.diaryService.updateDiary(diaryId, updateDiaryReqDto);
  }

  @ApiOperation({ summary: '이미지 업로드 presigned URL 생성' })
  @ApiParam({
    name: 'fileName',
    required: true,
    description: '업로드할 이미지 파일명',
    example: 'example_image.jpg',
  })
  @ApiOkResponse({
    description: 'URL 생성 성공',
    type: String,
  })
  @ApiBadGatewayResponse({
    description: 'URL 생성 실패',
    example: {
      statusCode: 502,
      message: 'URL 생성에 실패했습니다.',
      error: 'Bad Gateway',
    },
  })
  @Get('/get-signed-url/:fileName')
  @HttpCode(HttpStatus.OK)
  getSignedUrl(@Param() fileName: string): Promise<string> {
    this.logger.log('Get Signed URL');
    return this.awsService.getPresignedUrl(fileName);
  }

  @ApiOperation({ summary: '다이어리 삭제' })
  @ApiParam({
    name: 'diaryId',
    required: true,
    description: '특정 다이어리의 ID',
    example: 7,
  })
  @ApiNoContentResponse({
    description: '다이어리 삭제 성공',
    example: {
      statusCode: 204,
    },
  })
  @ApiForbiddenResponse({
    description: '다이어리 접근 권한 없음',
    example: {
      statusCode: 403,
      message: '해당 다이어리에 대한 접근 권한이 없습니다.',
      error: 'Forbidden',
    },
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
    example: {
      statusCode: 404,
      message: '해당 ID의 다이어리가 존재하지 않습니다.',
      error: 'Not Found',
    },
  })
  @ApiBadGatewayResponse({
    description: '다이어리 삭제 실패',
    example: {
      statusCode: 502,
      message: '다이어리 삭제에 실패했습니다.',
      error: 'Bad Gateway',
    },
  })
  @Delete('/delete/:diaryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiary(
    @User() uid: string,
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<void> {
    this.logger.log('Delete Diary');
    await this.diaryService.getDiaryById(diaryId, uid);
    return this.diaryService.deleteDiary(diaryId);
  }

  @ApiOperation({ summary: '다이어리 복구' })
  @ApiParam({
    name: 'diaryId',
    required: true,
    description: '특정 다이어리의 ID',
    example: 7,
  })
  @ApiOkResponse({
    description: '다이어리 복구 성공',
    type: UpdateDiaryResDto,
  })
  @ApiForbiddenResponse({
    description: '해당 다이어리에 대한 접근 권한이 없습니다.',
    example: {
      statusCode: 403,
      message: '해당 다이어리에 대한 접근 권한이 없습니다.',
      error: 'Forbidden',
    },
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
    example: {
      statusCode: 404,
      message: '해당 ID의 다이어리가 존재하지 않습니다.',
      error: 'Not Found',
    },
  })
  @ApiBadGatewayResponse({
    description: '다이어리 복구 실패',
    example: {
      statusCode: 502,
      message: '다이어리 복구에 실패했습니다.',
      error: 'Bad Gateway',
    },
  })
  @Patch('/restore/:diaryId')
  @HttpCode(HttpStatus.OK)
  async restoreDiary(
    @User() uid: string,
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<UpdateDiaryResDto> {
    this.logger.log('Restore Diary');
    await this.diaryService.getDiaryById(diaryId, uid);
    return this.diaryService.restoreDiary(diaryId);
  }
}
