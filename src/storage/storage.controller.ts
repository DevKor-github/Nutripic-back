import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { StorageService } from './storage.service';
import { DeleteFoodDto } from './dto/deleteFood.dto';
import { Food } from '@prisma/client';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';

@ApiTags('Storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  //내 식재료 가져오기
  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getFood(
    @User() userId: string
  ): Promise<{ storage: string; foods: Food[] }[]> {
    return this.storageService.getStorageByUser(userId);
  }

  //식재료 추가하기
  @ApiBody({ type: [CreateFoodDto], description: '추가할 식재료 정보 (배열)' })
  @UseGuards(FirebaseAuthGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  addFood(
    @User() userId: string,
    @Body() foods: CreateFoodDto[]
  ): Promise<Food[]> {
    return this.storageService.createFoods(userId, foods);
  }

  //식재료 삭제하기
  @ApiBody({ type: DeleteFoodDto, description: '삭제할 식재료 ID' })
  @UseGuards(FirebaseAuthGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  deleteFood(
    @User() userId: string,
    @Body() foodIds: number[]
  ): Promise<Food[]> {
    return this.storageService.deleteFood(userId, foodIds);
  }

  //식재료 정보 수정
  @ApiBody({
    type: UpdateFoodDto,
    description: '수정할 식재료 ID, 수정 정보 (id 제외 모두 optional field)',
  })
  @UseGuards(FirebaseAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  updateFood(
    @User() userId: string,
    @Body() food: UpdateFoodDto
  ): Promise<Food> {
    return this.storageService.updateFoodInfo(userId, food);
  }
}
