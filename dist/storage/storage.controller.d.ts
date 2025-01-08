import { StorageService } from './storage.service';
import { DeleteFoodDto } from './dto/deleteFood.dto';
import { Food } from '@prisma/client';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    getFood(userId: string): Promise<{
        storage: string;
        foods: Food[];
    }[]>;
    addFood(userId: string, foods: CreateFoodDto[]): Promise<Food[]>;
    deleteFood(userId: string, food: DeleteFoodDto): Promise<Food>;
    updateFood(userId: string, food: UpdateFoodDto): Promise<Food>;
}
