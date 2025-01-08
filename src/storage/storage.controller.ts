import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { StorageService } from './storage.service';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
import { FoodDto } from './dto/food.dto';

@ApiTags('Storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  private logger: Logger = new Logger(StorageController.name);

  @ApiOperation({ summary: '내 식재료 가져오기' })
  @ApiOkResponse({
    type: FoodDto,
    isArray: true,
    description: '유저의 식재료 목록 반환',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getFood(
    @User() userId: string
  ): Promise<{ storage: string; foods: FoodDto[] }[]> {
    this.logger.log(`Get food by user: ${userId}`);
    return this.storageService.getStorageByUser(userId);
  }

  @ApiOperation({ summary: '식재료 추가' })
  @ApiBody({ type: [CreateFoodDto], description: '추가할 식재료 정보 (배열)' })
  @ApiOkResponse({
    type: FoodDto,
    isArray: true,
    description: '추가된 식재료 목록 반환',
  })
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  addFood(
    @User() userId: string,
    @Body() foods: CreateFoodDto[]
  ): Promise<FoodDto[]> {
    return this.storageService.createFoods(userId, foods);
  }

  //식재료 삭제하기
  @ApiOperation({ summary: '식재료 삭제' })
  @ApiBody({
    type: Number,
    isArray: true,
    description: '삭제할 식재료 ID',
  })
  @ApiOkResponse({
    type: Number,
    description: '삭제된 식재료 개수 반환',
  })
  @UseGuards(FirebaseAuthGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  deleteFood(
    @User() userId: string,
    @Body() foodIds: number[]
  ): Promise<number> {
    return this.storageService.deleteFood(userId, foodIds);
  }

  //식재료 정보 수정
  @ApiOperation({ summary: '식재료 정보 수정' })
  @ApiBody({
    type: UpdateFoodDto,
    description: '수정할 식재료 ID, 수정 정보 (id 제외 모두 optional field)',
  })
  @ApiOkResponse({
    type: FoodDto,
    description: '수정된 식재료 정보 반환',
  })
  @UseGuards(FirebaseAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  updateFood(
    @User() userId: string,
    @Body() food: UpdateFoodDto
  ): Promise<FoodDto> {
    return this.storageService.updateFoodInfo(userId, food);
  }
}
