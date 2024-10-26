import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Food, Storage, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageRepository } from './storage.repository';
import { FoodDto } from './dto/food.dto';
import { UpdateFoodDto } from './dto/updateFood.dto';

@Injectable()
export class StorageService {
  constructor(
    private prisma: PrismaService,
    private userservice: UserService,
    private storageRepository: StorageRepository
  ) {}

  //음식 생성
  async createFoods(userId: string, Foods: FoodDto[]): Promise<Food[]> {
    //TODO: 식재료 유통기한 정보 추가

    const FoodsToAdd = Foods.map((food) => ({
      userId,
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
  async deleteFood(
    userId: string,
    foodId: number,
    amount: number
  ): Promise<Food> {
    const foodToDelete = await this.checkIsFoodOwner(userId, foodId);

    //같은 유통기한의 식재료가 아직 남아있다면 수량 정보만 변경
    if (foodToDelete.amount > amount)
      return this.storageRepository.updateFoodAmount(
        foodId,
        foodToDelete.amount - amount
      );
    else return this.storageRepository.deleteByFoodId(foodId);
  }

  //음식 정보 수정
  async updateFoodInfo(userId: string, newFoodInfo: UpdateFoodDto) {
    const food = await this.checkIsFoodOwner(userId, newFoodInfo.id);

    const newFood: UpdateFoodDto = {
      ...food,
      ...newFoodInfo,
    };

    return this.storageRepository.updateFoodInfo(newFood);
  }

  async checkIsFoodOwner(userId: string, foodId: number): Promise<Food> {
    const food = await this.storageRepository.findByFoodId(foodId);
    if (food.userId != userId) throw new UnauthorizedException();
    return food;
  }
}
