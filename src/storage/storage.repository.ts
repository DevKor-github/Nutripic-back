import { Injectable } from '@nestjs/common';
import { Food, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';

@Injectable()
export class StorageRepository {
  constructor(private prisma: PrismaService) {}

  //Storage에 저장된 식재료 모두 찾기
  async findFoodByStorage(
    userId: string,
    storageType: StorageType
  ): Promise<Food[]> {
    return this.prisma.food.findMany({
      where: { userId, storageType },
    });
  }

  async createFoods(userId: string, foods: CreateFoodDto[]): Promise<Food[]> {
    const createFoodData = foods.map((food) => ({ ...food, userId }));
    return this.prisma.food.createManyAndReturn({
      data: createFoodData,
    });
  }

  async findByFoodId(id: number): Promise<Food> {
    return this.prisma.food.findUnique({
      where: { id },
    });
  }

  async deleteByFoodId(id: number): Promise<Food> {
    return this.prisma.food.delete({
      where: { id },
    });
  }

  async updateFoodInfo(foodInfo: UpdateFoodDto): Promise<Food> {
    return this.prisma.food.update({
      where: { id: foodInfo.id },
      data: {
        ...foodInfo,
      },
    });
  }
}
