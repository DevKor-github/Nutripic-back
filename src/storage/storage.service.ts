import { Injectable } from '@nestjs/common';
import { Food, Storage, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageRepository } from './storage.repository';
import { FoodDto } from './dto/food.dto';

@Injectable()
export class StorageService {
  constructor(
    private prisma: PrismaService,
    private userservice: UserService,
    private storageRepository: StorageRepository
  ) {}

  //음식 생성
  async createFoods(
    userId: string,
    storageType: string,
    Foods: FoodDto[]
  ): Promise<Food[]> {
    //TODO: 식재료 유통기한 정보 추가

    const FoodsToAdd = Foods.map((food) => ({
      userId,
      storageType: StorageType[storageType],
      ...food,
    }));

    return this.storageRepository.createFoods(FoodsToAdd);
  }

  //내 식재료 가져오기
  async getStorageByUser(
    userId: string
  ): Promise<{ storage: Storage; foods: Food[] }[]> {
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
        return { storage, foods };
      })
    );

    return foodsInStorage;
  }

  //음식 삭제
  async deleteFood(userId: string): Promise<boolean> {
    return true;
  }

  //음식 정보 수정
}
