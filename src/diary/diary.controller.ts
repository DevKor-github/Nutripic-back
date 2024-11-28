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
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';
import { $Enums } from '@prisma/client';

@Public()
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
    schema: {
      properties: {
        body: {
          type: 'string',
          example: '본문 예시입니다.',
        },
        date: {
          type: 'Date || String',
          example: '2024-11-12T19:30:00.000Z',
        },
      },
      type: $Enums['UpdateDiaryReqDto'],
    },
  })
  @ApiOkResponse({
    description: '다이어리 수정 성공',
    type: UpdateDiaryResDto,
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
  })
  @ApiBadGatewayResponse({
    description: '다이어리 수정 실패',
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
    description: '이미지 업로드 presigned URL 생성 성공',
    type: String,
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
  @ApiOkResponse({
    description: '다이어리 삭제 성공',
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
  })
  @Delete('/delete/:diaryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiary(
    @Param('diaryId', ParseIntPipe) diaryId: number
  ): Promise<void> {
    this.logger.log('Delete Diary');
    await this.diaryService.getDiaryById(diaryId);
    return this.diaryService.deleteDiary(diaryId);
  }

  @ApiOperation({ summary: '다이어리 복원' })
  @ApiParam({
    name: 'diaryId',
    required: true,
    description: '특정 다이어리의 ID',
    example: 7,
  })
  @ApiOkResponse({
    description: '다이어리 복원 성공',
    type: UpdateDiaryResDto,
  })
  @ApiNotFoundResponse({
    description: '해당 ID의 다이어리가 존재하지 않습니다.',
  })
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
