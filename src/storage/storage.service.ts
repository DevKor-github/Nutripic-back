import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Storage, StorageType } from '@prisma/client';
import { StorageRepository } from './storage.repository';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class StorageService {
  constructor(private storageRepository: StorageRepository) {}

  //식재료 추가
  async createFoods(
    userId: string,
    Foods: CreateFoodDto[]
  ): Promise<FoodDto[]> {
    //TODO: 식재료 유통기한 정보 추가

    return this.storageRepository.createFoods(userId, Foods);
  }

  //내 식재료 가져오기
  async getStorageByUser(
    userId: string
  ): Promise<{ storage: string; foods: FoodDto[] }[]> {
    const storages: Storage[] = [
      { userId, type: StorageType.freezer },
      { userId, type: StorageType.fridge },
      { userId, type: StorageType.room },
    ];

    const foodsInStorage = await Promise.all(
      storages.map(async (storage) => {
        const foods = await this.storageRepository.findFoodByStorage(
          userId,
          storage.type
        );
        return { storage: storage.type, foods };
      })
    );

    return foodsInStorage;
  }

  //식재료 삭제
  async deleteFood(userId: string, foodIds: number[]): Promise<number> {
    await this.checkIsFoodOwner(userId, foodIds);
    return this.storageRepository.deleteManyFoods(foodIds);
  }

  //식재료 정보 수정
  async updateFoodInfo(
    userId: string,
    newFoodInfo: UpdateFoodDto
  ): Promise<FoodDto> {
    const food = await this.storageRepository.findByFoodId(newFoodInfo.id);
    if (food.userId != userId) throw new UnauthorizedException();

    const newFood: UpdateFoodDto = {
      ...food,
      ...newFoodInfo,
    };

    return this.storageRepository.updateFoodInfo(newFood);
  }

  //삭제하는 식재료가 로그인한 유저 소유인지 확인
  async checkIsFoodOwner(userId: string, foodIds: number[]): Promise<boolean> {
    const foodInfo = await this.storageRepository.findFoodsWithOwner(
      userId,
      foodIds
    );
    if (foodInfo.length != foodIds.length) throw new UnauthorizedException();
    return true;
  }
}
