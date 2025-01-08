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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const storage_repository_1 = require("./storage.repository");
let StorageService = class StorageService {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    async createFoods(userId, Foods) {
        return this.storageRepository.createFoods(userId, Foods);
    }
    async getStorageByUser(userId) {
        const storages = [
            { userId, type: client_1.StorageType.freezer },
            { userId, type: client_1.StorageType.fridge },
            { userId, type: client_1.StorageType.room },
        ];
        const foodsInStorage = await Promise.all(storages.map(async (storage) => {
            const foods = await this.storageRepository.findFoodByStorage(userId, storage.type);
            return { storage: storage.type, foods };
        }));
        return foodsInStorage;
    }
    async deleteFood(userId, foodId) {
        const foodToDelete = await this.checkIsFoodOwner(userId, foodId);
        return this.storageRepository.deleteByFoodId(foodToDelete.id);
    }
    async updateFoodInfo(userId, newFoodInfo) {
        const food = await this.checkIsFoodOwner(userId, newFoodInfo.id);
        const newFood = {
            ...food,
            ...newFoodInfo,
        };
        return this.storageRepository.updateFoodInfo(newFood);
    }
    async checkIsFoodOwner(userId, foodId) {
        const food = await this.storageRepository.findByFoodId(foodId);
        if (food.userId != userId)
            throw new common_1.UnauthorizedException();
        return food;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_repository_1.StorageRepository])
], StorageService);
//# sourceMappingURL=storage.service.js.map