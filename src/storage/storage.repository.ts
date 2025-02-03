import { Injectable } from '@nestjs/common';
import { StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class StorageRepository {
  constructor(private prisma: PrismaService) {}

  //Storage에 저장된 식재료 모두 찾기
  async findFoodByStorage(
    userId: string,
    storageType: StorageType
  ): Promise<FoodDto[]> {
    return this.prisma.food.findMany({
      where: { userId, storageType },
    });
  }

  async createFoods(
    userId: string,
    foods: CreateFoodDto[]
  ): Promise<FoodDto[]> {
    const createFoodData = foods.map((food) => ({ ...food, userId }));
    return this.prisma.food.createManyAndReturn({
      data: createFoodData,
    });
  }

  async findByFoodId(id: number): Promise<FoodDto> {
    return this.prisma.food.findUnique({
      where: { id },
    });
  }

  async findFoodsWithOwner(
    userId: string,
    foodIds: number[]
  ): Promise<FoodDto[]> {
    return this.prisma.food.findMany({
      where: { id: { in: foodIds }, userId: userId },
    });
  }

  async deleteManyFoods(foodIds: number[]): Promise<number> {
    const deleteCount = await this.prisma.food.deleteMany({
      where: { id: { in: foodIds } },
    });
    return deleteCount.count;
  }

  async updateFoodInfo(foodInfo: UpdateFoodDto): Promise<FoodDto> {
    return this.prisma.food.update({
      where: { id: foodInfo.id },
      data: {
        ...foodInfo,
      },
    });
  }
}
