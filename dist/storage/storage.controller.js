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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const user_decorator_1 = require("../utils/decorator/user.decorator");
const storage_service_1 = require("./storage.service");
const deleteFood_dto_1 = require("./dto/deleteFood.dto");
const updateFood_dto_1 = require("./dto/updateFood.dto");
const createFood_dto_1 = require("./dto/createFood.dto");
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    getFood(userId) {
        return this.storageService.getStorageByUser(userId);
    }
    addFood(userId, foods) {
        return this.storageService.createFoods(userId, foods);
    }
    deleteFood(userId, food) {
        return this.storageService.deleteFood(userId, food.id);
    }
    updateFood(userId, food) {
        return this.storageService.updateFoodInfo(userId, food);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getFood", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: [createFood_dto_1.CreateFoodDto], description: '추가할 식재료 정보 (배열)' }),
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Post)('/add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "addFood", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: deleteFood_dto_1.DeleteFoodDto, description: '삭제할 식재료 ID' }),
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Delete)('/delete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deleteFood_dto_1.DeleteFoodDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "deleteFood", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: updateFood_dto_1.UpdateFoodDto,
        description: '수정할 식재료 ID, 수정 정보 (id 제외 모두 optional field)',
    }),
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Put)('/update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateFood_dto_1.UpdateFoodDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "updateFood", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Storage'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map