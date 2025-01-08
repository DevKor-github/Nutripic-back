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
var RecipeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_decorator_1 = require("../utils/decorator/user.decorator");
const recipeFilter_dto_1 = require("./dto/recipeFilter.dto");
let RecipeController = RecipeController_1 = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
        this.logger = new common_1.Logger(RecipeController_1.name);
    }
    getRecommendedRecipe(userId) {
        this.logger.log(`Get recommended recipe by user: ${userId}`);
        return this.recipeService.getRecommandedRecipe(userId);
    }
    getRecipePreviews(recipeIds) {
        this.logger.log(`Get recipe previews of ${recipeIds}`);
        return this.recipeService.getRecipePreviews(recipeIds);
    }
    getFilteredRecipe(recipeFilter) {
        return this.recipeService.getFilteredRecipe(recipeFilter);
    }
    getRecipeDetail(recipeId) {
        return this.recipeService.viewRecipeDetails(recipeId);
    }
    addRecipeBookmark(userId, recipeId) {
        return this.recipeService.addRecipeBookmark(userId, recipeId);
    }
    viewRecipeBookmark(userId) {
        return this.recipeService.viewMyBookmark(userId);
    }
    deleteRecipeBookmark(userId, recipeId) {
        return this.recipeService.deleteBookmark(userId, recipeId);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('recommended'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [[Number]] }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecommendedRecipe", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('previews'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/recipePreview.dto").RecipePreviewDto] }),
    __param(0, (0, common_1.Body)('recipeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipePreviews", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('filter'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/recipePreview.dto").RecipePreviewDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipeFilter_dto_1.RecipeFilterDto]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getFilteredRecipe", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('detail/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/recipe.dto").RecipeDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipeDetail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Post)('bookmark/add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Number }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addRecipeBookmark", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('bookmark/view'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/recipePreview.dto").RecipePreviewDto] }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "viewRecipeBookmark", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Delete)('bookmark/delete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Number }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "deleteRecipeBookmark", null);
exports.RecipeController = RecipeController = RecipeController_1 = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map