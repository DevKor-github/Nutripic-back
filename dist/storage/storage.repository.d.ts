import { Food, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CreateFoodDto } from './dto/createFood.dto';
export declare class StorageRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findFoodByStorage(userId: string, storageType: StorageType): Promise<Food[]>;
    createFoods(userId: string, foods: CreateFoodDto[]): Promise<Food[]>;
    findByFoodId(id: number): Promise<Food>;
    deleteByFoodId(id: number): Promise<Food>;
    updateFoodInfo(foodInfo: UpdateFoodDto): Promise<Food>;
}
