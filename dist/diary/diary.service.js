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
var DiaryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const diary_repository_1 = require("./diary.repository");
let DiaryService = DiaryService_1 = class DiaryService {
    constructor(diaryRepository) {
        this.diaryRepository = diaryRepository;
        this.logger = new common_1.Logger(DiaryService_1.name);
    }
    async getDiaryByUser(userId, index) {
        const today = new Date();
        const targetDate = new Date(today.setMonth(today.getMonth() - index));
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();
        const diaries = await this.diaryRepository.getDiaryByUser(userId, targetYear, targetMonth);
        return diaries.map((diary) => ({
            id: diary.id,
            url: diary.url,
            date: diary.date,
        }));
    }
    async getDiaryById(diaryId, userId) {
        const diary = await this.diaryRepository.getDiaryById(diaryId);
        if (!diary)
            throw new common_1.NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');
        if (userId && diary.userId !== userId)
            throw new common_1.ForbiddenException('해당 다이어리에 대한 접근 권한이 없습니다.');
        return {
            id: diary.id,
            body: diary.body,
            url: diary.url,
            date: diary.date,
        };
    }
    async createDiary(userId, createDiaryReqDto) {
        const { body, date, url } = createDiaryReqDto;
        const diary = await this.diaryRepository.createDiary(userId, body, url, new Date(date));
        if (!diary)
            throw new common_1.BadGatewayException('다이어리 생성에 실패했습니다.');
        return;
    }
    async updateDiary(diaryId, updateDiaryReqDto) {
        const diary = await this.diaryRepository.getDiaryById(diaryId);
        if (!diary)
            throw new common_1.NotFoundException('해당 ID의 다이어리가 존재하지 않습니다.');
        const { body, date } = updateDiaryReqDto;
        const updatedDiary = await this.diaryRepository.updateDiary(diaryId, body, new Date(date));
        if (!updatedDiary)
            throw new common_1.BadGatewayException('다이어리 수정에 실패했습니다.');
        return {
            id: updatedDiary.id,
            body: updatedDiary.body,
            url: updatedDiary.url,
            date: updatedDiary.date,
        };
    }
    async deleteDiary(diaryId) {
        const diary = await this.diaryRepository.deleteDiary(diaryId);
        if (!diary || diary.isDeleted === false)
            throw new common_1.BadGatewayException('다이어리 삭제에 실패했습니다.');
    }
    async restoreDiary(diaryId) {
        const diary = await this.diaryRepository.restoreDiary(diaryId);
        if (!diary || diary.isDeleted === true)
            throw new common_1.BadGatewayException('다이어리 복구에 실패했습니다.');
        return {
            id: diary.id,
            body: diary.body,
            url: diary.url,
            date: diary.date,
        };
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = DiaryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [diary_repository_1.DiaryRepository])
], DiaryService);
//# sourceMappingURL=diary.service.js.map