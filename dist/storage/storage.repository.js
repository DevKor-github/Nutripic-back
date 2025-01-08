"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StorageRepository = class StorageRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findFoodByStorage(userId, storageType) {
        return this.prisma.food.findMany({
            where: { userId, storageType },
        });
    }
    async createFoods(userId, foods) {
        const createFoodData = foods.map((food) => ({ ...food, userId }));
        return this.prisma.food.createManyAndReturn({
            data: createFoodData,
        });
    }
    async findByFoodId(id) {
        return this.prisma.food.findUnique({
            where: { id },
        });
    }
    async deleteByFoodId(id) {
        return this.prisma.food.delete({
            where: { id },
        });
    }
    async updateFoodInfo(foodInfo) {
        return this.prisma.food.update({
            where: { id: foodInfo.id },
            data: {
                ...foodInfo,
            },
        });
    }
};
exports.StorageRepository = StorageRepository;
exports.StorageRepository = StorageRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StorageRepository);
//# sourceMappingURL=storage.repository.js.map