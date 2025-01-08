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
exports.GetAllDiaryResDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetAllDiaryResDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, url: { required: true, type: () => String }, date: { required: true, type: () => Date } };
    }
}
exports.GetAllDiaryResDto = GetAllDiaryResDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '다이어리 ID', default: 7 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetAllDiaryResDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '업로드 이미지 객체 URL',
        example: 'https://example.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetAllDiaryResDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '원하는 다이어리 등록 일자',
        example: new Date('2024-11-12T19:30:00.000Z'),
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], GetAllDiaryResDto.prototype, "date", void 0);
//# sourceMappingURL=getAllDiary.dto.js.map