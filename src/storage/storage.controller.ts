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
import { FoodDto } from './dto/food.dto';
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
  getFood(@User() uid: string): Promise<{ storage: string; foods: Food[] }[]> {
    return this.storageService.getStorageByUser(uid);
  }

  //식재료 추가하기
  @ApiBody({ type: [FoodDto], description: '추가할 식재료 정보 (배열)' })
  @UseGuards(FirebaseAuthGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  addFood(
    @User() uid: string,
    @Body() foods: CreateFoodDto[]
  ): Promise<Food[]> {
    return this.storageService.createFoods(uid, foods);
  }

  //식재료 삭제하기
  @ApiBody({ type: DeleteFoodDto, description: '삭제할 식재료 ID, 삭제 수량' })
  @UseGuards(FirebaseAuthGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  deleteFood(@User() uid: string, @Body() food: DeleteFoodDto): Promise<Food> {
    return this.storageService.deleteFood(uid, food.id, food.amount);
  }

  //식재료 정보 수정
  @ApiBody({ type: UpdateFoodDto, description: '수정할 식재료 ID, 수정 정보' })
  @UseGuards(FirebaseAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  updateFood(@User() uid: string, @Body() food: UpdateFoodDto): Promise<Food> {
    return this.storageService.updateFoodInfo(uid, food);
  }
}
