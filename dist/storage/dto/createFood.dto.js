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
exports.CreateFoodDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateFoodDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { storageType: { required: true, type: () => Object }, name: { required: true, type: () => String }, class1: { required: true, type: () => String }, class2: { required: false, type: () => String }, icon: { required: false, type: () => String }, addedDate: { required: false, type: () => Object }, expireDate: { required: false, type: () => Object }, expired: { required: false, type: () => Boolean } };
    }
}
exports.CreateFoodDto = CreateFoodDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'fridge/freezer/room' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "storageType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '식재료 이름' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '대분류' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "class1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '중분류' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "class2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '표시 아이콘 URL' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFoodDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '추가 날짜' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateFoodDto.prototype, "addedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유통기한' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateFoodDto.prototype, "expireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '유통기한 지남 여부' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateFoodDto.prototype, "expired", void 0);
//# sourceMappingURL=createFood.dto.js.map