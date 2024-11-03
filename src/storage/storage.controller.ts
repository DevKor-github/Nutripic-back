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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { FoodDto } from './dto/food.dto';
import { StorageService } from './storage.service';
import { DeleteFoodDto } from './dto/deleteFood.dto';
import { Food } from '@prisma/client';
import { UpdateFoodDto } from './dto/updateFood.dto';

@ApiTags('Storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  //내 식재료 가져오기
  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getFood(@User() uid: string) {
    return this.storageService.getStorageByUser(uid);
  }

  //식재료 추가하기
  @UseGuards(FirebaseAuthGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  addFood(@User() uid: string, @Body() foods: FoodDto[]): Promise<Food[]> {
    return this.storageService.createFoods(uid, foods);
  }

  //식재료 삭제하기
  @UseGuards(FirebaseAuthGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  deleteFood(@User() uid: string, @Body() food: DeleteFoodDto): Promise<Food> {
    return this.storageService.deleteFood(uid, food.id, food.amount);
  }

  //식재료 정보 수정
  @UseGuards(FirebaseAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  updateFood(@User() uid: string, @Body() food: UpdateFoodDto): Promise<Food> {
    return this.storageService.updateFoodInfo(uid, food);
  }
}
