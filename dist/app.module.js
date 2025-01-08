"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const utils_1 = require("./utils");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./cores/exceptions/http-exception.filter");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const auth_guard_1 = require("./auth/auth.guard");
const storage_module_1 = require("./storage/storage.module");
const diary_module_1 = require("./diary/diary.module");
const aws_module_1 = require("./aws/aws.module");
const recipe_module_1 = require("./recipe/recipe.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`,
                validationSchema: utils_1.validation,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            storage_module_1.StorageModule,
            diary_module_1.DiaryModule,
            aws_module_1.AwsModule,
            recipe_module_1.RecipeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.FirebaseAuthGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map