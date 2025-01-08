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
exports.DiaryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiaryRepository = class DiaryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDiaryById(diaryId) {
        return await this.prisma.diary.findUnique({
            where: {
                id: diaryId,
            },
        });
    }
    async getDiaryByUser(userId, year, month) {
        return await this.prisma.diary.findMany({
            where: {
                userId: userId,
                date: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1),
                },
                isDeleted: false,
            },
        });
    }
    createDiary(userId, body, url, date) {
        return this.prisma.diary.create({
            data: {
                userId: userId,
                body: body,
                url: url,
                date: date,
            },
        });
    }
    async updateDiary(diaryId, body, date) {
        return await this.prisma.diary.update({
            where: {
                id: diaryId,
            },
            data: {
                body: body,
                date: date,
            },
        });
    }
    async deleteDiary(diaryId) {
        return await this.prisma.diary.update({
            where: {
                id: diaryId,
            },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
    }
    async restoreDiary(diaryId) {
        return await this.prisma.diary.update({
            where: {
                id: diaryId,
            },
            data: {
                isDeleted: false,
                deletedAt: null,
            },
        });
    }
};
exports.DiaryRepository = DiaryRepository;
exports.DiaryRepository = DiaryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiaryRepository);
//# sourceMappingURL=diary.repository.js.map