import { Injectable } from '@nestjs/common';
import { Food, StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageRepository } from './storage.repository';

@Injectable()
export class StorageService {
    constructor(
        private prisma: PrismaService,
        private userservice: UserService,
        private storageRepository: StorageRepository
    ) {}

    //내 식재료 가져오기
    async getStorageByUser(userId: string): Promise<{ storage: string; foods: Food[] }[]> {
        const storages = await this.storageRepository.findStoragesByUser(userId);
      
        const foodsInStorage = await Promise.all(
            storages.map( async (storage) => {
                const foods = await this.storageRepository.findFoodByStorage(
                    storage.userId,
                    storage.type
                );
                return { storage: storage.type, foods };
            }),
        );

        return foodsInStorage;
    }

    async addFood(userId: string, storageType: string): Promise<boolean> {

        return true;
    }

    async deleteFood(userId: string): Promise<boolean> {

        return true;
    }

}

