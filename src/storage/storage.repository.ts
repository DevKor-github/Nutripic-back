import { Injectable } from '@nestjs/common';
import { StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
import { FoodDto } from './dto/food.dto';
import { FoodInfoDto } from './dto/foodInfo.dto';

@Injectable()
export class StorageRepository {
  constructor(private prisma: PrismaService) {}

  calculateDaysTilExpire(foods: FoodDto[]): FoodDto[] {
    const currentDate = new Date();
    const currentDateZero = new Date(currentDate.setUTCHours(0, 0, 0, 0));

    return foods.map((food) => {
      if (food.expireDate === null) {
        return { ...food, daysTilExpire: null };
      } //유통기한 만료일이 없다면 daysTilExpire = null
      const expireDate = new Date(food.expireDate);

      const daysTilExpire = Math.ceil(
        (new Date(expireDate.setUTCHours(0, 0, 0, 0)).getTime() -
          currentDateZero.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return { ...food, daysTilExpire };
    });
  }

  //Storage에 저장된 식재료 모두 찾기
  async findFoodByStorage(
    userId: string,
    storageType: StorageType
  ): Promise<FoodDto[]> {
    const foodsInStorage = await this.prisma.food.findMany({
      where: { userId, storageType },
    });
    return this.calculateDaysTilExpire(foodsInStorage);
  }

  async createFoods(
    userId: string,
    foods: CreateFoodDto[]
  ): Promise<FoodDto[]> {
    const createFoodData = foods.map((food) => ({ ...food, userId }));
    const foodsCreated = await this.prisma.food.createManyAndReturn({
      data: createFoodData,
    });
    return this.calculateDaysTilExpire(foodsCreated);
  }

  async findByFoodId(id: number): Promise<FoodDto> {
    const foodFound = await this.prisma.food.findUnique({
      where: { id },
    });
    return this.calculateDaysTilExpire([foodFound])[0];
  }

  async createFoodsById(userId: string, foodIds: number[]): Promise<FoodDto[]> {
    const foodData = await this.prisma.foodInfo.findMany({
      where: {
        id: { in: foodIds },
      },
    });
    const createFoodData = foodData.map((food) => {
      const currentDate = new Date();
      const expireDate = new Date(currentDate);
      expireDate.setDate(expireDate.getDate() + food.expireDate);
      return { ...food, name: food.class2, expireDate, userId };
    });

    const createdData = await this.prisma.food.createManyAndReturn({
      data: createFoodData,
    });
    return this.calculateDaysTilExpire(createdData);
  }

  async findFoodsWithOwner(
    userId: string,
    foodIds: number[]
  ): Promise<FoodDto[]> {
    console.log(foodIds, userId);
    const foodsFound = await this.prisma.food.findMany({
      where: { id: { in: foodIds }, userId: userId },
    });
    return this.calculateDaysTilExpire(foodsFound);
  }

  async deleteManyFoods(foodIds: number[]): Promise<number> {
    console.log(foodIds);
    const deleteCount = await this.prisma.food.deleteMany({
      where: { id: { in: foodIds } },
    });
    return deleteCount.count;
  }

  async updateFoodInfo(foodInfo: UpdateFoodDto): Promise<FoodDto> {
    const foodUpdated = await this.prisma.food.update({
      where: { id: foodInfo.id },
      data: {
        storageType: foodInfo.storageType,
        name: foodInfo.name,
        class1: foodInfo.class1,
        class2: foodInfo.class2,
        icon: foodInfo.icon,
        addedDate: foodInfo.addedDate,
        expireDate: foodInfo.expireDate,
      },
    });
    return this.calculateDaysTilExpire([foodUpdated])[0];
  }

  async getAllClasses(): Promise<FoodInfoDto[]> {
    return this.prisma.foodInfo.findMany();
  }

  async searchFoodInfo(keyword: string): Promise<FoodInfoDto[]> {
    return this.prisma.foodInfo.findMany({
      where: {
        class2: { contains: keyword },
      },
    });
  }
}
