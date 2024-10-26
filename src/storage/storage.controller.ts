import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { FoodDto } from './dto/food.dto';
import { StorageService } from './storage.service';
import { DeleteFoodDto } from './dto/deleteFood.dto';
import { Food } from '@prisma/client';

@ApiTags('Storage')
@ApiBearerAuth()
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getFood(@User() uid: string) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  addFood(@User() uid: string, @Body() foods: FoodDto[]): Promise<Food[]> {
    return this.storageService.createFoods(uid, foods);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  deleteFood(@User() uid: string, @Body() food: DeleteFoodDto): Promise<Food> {
    return this.storageService.deleteFood(uid, food.id, food.amount);
  }
}
