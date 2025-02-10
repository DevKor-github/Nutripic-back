import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Storage, StorageType } from '@prisma/client';
import { StorageRepository } from './storage.repository';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
import { FoodDto } from './dto/food.dto';
import { FoodInfoDto } from './dto/foodInfo.dto';

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
    const deleteCount = await this.storageRepository.deleteManyFoods(foodIds);
    if (deleteCount != foodIds.length)
      throw new BadGatewayException('식재료 삭제에 실패했습니다.');
    return deleteCount;
  }

  //식재료 정보 수정
  async updateFoodInfo(
    userId: string,
    newFoodInfo: UpdateFoodDto
  ): Promise<FoodDto> {
    const food = await this.storageRepository.findByFoodId(newFoodInfo.id);
    if (food.userId != userId)
      throw new ForbiddenException('해당 식재료에 대한 접근 권한이 없습니다.');

    const newFood: UpdateFoodDto = {
      ...food,
      ...newFoodInfo,
    };
    if (!newFood)
      throw new BadGatewayException('식재료 정보 수정에 실패했습니다.');
    return this.storageRepository.updateFoodInfo(newFood);
  }

  //삭제하는 식재료가 로그인한 유저 소유인지 확인
  async checkIsFoodOwner(userId: string, foodIds: number[]): Promise<boolean> {
    const foodInfo = await this.storageRepository.findFoodsWithOwner(
      userId,
      foodIds
    );
    if (foodInfo.length != foodIds.length)
      throw new ForbiddenException('해당 식재료에 대한 접근 권한이 없습니다.');
    return true;
  }

  async getClasses(): Promise<FoodInfoDto[]> {
    return this.storageRepository.getAllClasses();
  }
}
