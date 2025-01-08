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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(uid) {
        const newUser = await this.prisma.user.create({
            data: { uid },
        });
        await this.prisma.storage.createMany({
            data: [
                { userId: uid, type: client_1.StorageType.freezer },
                { userId: uid, type: client_1.StorageType.fridge },
                { userId: uid, type: client_1.StorageType.room },
            ],
        });
        return newUser.uid;
    }
    async deleteUser(uid) {
        const deletedUser = await this.prisma.user.delete({ where: { uid } });
        return deletedUser.uid;
    }
    async checkUserExists(uid) {
        const user = await this.prisma.user.findUnique({
            where: { uid },
        });
        if (user !== null) {
            return true;
        }
        else
            return false;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map