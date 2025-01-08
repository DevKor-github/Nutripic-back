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
var FirebaseAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthGuard = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const firebase_service_1 = require("./firebase/firebase.service");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
let FirebaseAuthGuard = FirebaseAuthGuard_1 = class FirebaseAuthGuard {
    constructor(firebaseService, reflector) {
        this.firebaseService = firebaseService;
        this.reflector = reflector;
        this.logger = new common_1.Logger(FirebaseAuthGuard_1.name);
        this.auth = firebaseService.getAuth();
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(exports.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            this.logger.warn('Missing or Malformed authorization token');
            throw new common_1.UnauthorizedException('토큰이 없거나 형식이 올바르지 않습니다.');
        }
        try {
            const decodedToken = await this.auth.verifyIdToken(token);
            request.user = decodedToken;
            this.logger.log(`Successfully authenticated: user ${decodedToken.uid}`);
            return true;
        }
        catch (err) {
            this.logger.error('Invalid or expired token', err.stack);
            throw new common_1.UnauthorizedException('유효하지 않거나 만료된 토큰입니다.');
        }
    }
    extractToken(request) {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }
        else
            throw new common_1.UnauthorizedException('토큰이 없거나 유효하지 않은 형식입니다');
    }
};
exports.FirebaseAuthGuard = FirebaseAuthGuard;
exports.FirebaseAuthGuard = FirebaseAuthGuard = FirebaseAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        core_1.Reflector])
], FirebaseAuthGuard);
//# sourceMappingURL=auth.guard.js.map