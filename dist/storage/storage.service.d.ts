import { Food } from '@prisma/client';
import { StorageRepository } from './storage.repository';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
export declare class StorageService {
    private storageRepository;
    constructor(storageRepository: StorageRepository);
    createFoods(userId: string, Foods: CreateFoodDto[]): Promise<Food[]>;
    getStorageByUser(userId: string): Promise<{
        storage: string;
        foods: Food[];
    }[]>;
    deleteFood(userId: string, foodId: number): Promise<Food>;
    updateFoodInfo(userId: string, newFoodInfo: UpdateFoodDto): Promise<Food>;
    checkIsFoodOwner(userId: string, foodId: number): Promise<Food>;
}
