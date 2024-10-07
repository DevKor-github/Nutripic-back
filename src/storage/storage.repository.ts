import { Injectable } from "@nestjs/common";
import { Food, Storage, StorageType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StorageRepository {
    constructor(private prisma: PrismaService) {}

    async findStoragesByUser(userId: string): Promise<Storage[]>{
        const tmp = this.prisma.storage.findMany({
            where: { userId }
        })
        return tmp;
    }

    async findFoodByStorage(
        userId: string,
        storageType: StorageType
    ): Promise<Food[]>{
        return this.prisma.food.findMany({
            where: { userId, storageType}
        })
    }
}