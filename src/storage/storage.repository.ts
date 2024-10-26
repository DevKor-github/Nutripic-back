import { Injectable } from '@nestjs/common';
import { Food, Storage, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodDto } from './dto/food.dto';

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

  async createFoods(foods: FoodDto[]): Promise<Food[]> {
    return this.prisma.food.createManyAndReturn({
      data: foods, //food dto id 확인
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

  async updateFoodAmount(id: number, newAmount: number): Promise<Food> {
    return this.prisma.food.update({
      where: { id },
      data: { amount: newAmount },
    });
  }
}
