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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const recipe_repository_1 = require("./recipe.repository");
let RecipeService = class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    async getRecommandedRecipe(uid) {
        const userFoodList = await this.recipeRepository.getUserFoodList(uid);
        if (userFoodList.length === 0)
            return [[], []];
        const moreIngredients = 2;
        const recommendedRecipes = await this.recipeRepository.getRecommendedRecipes(userFoodList, moreIngredients);
        const splitIndex = recommendedRecipes.findIndex((recipe) => recipe[1] > 0);
        if (splitIndex === -1)
            return [recommendedRecipes.map((info) => info[0]), []];
        const nowRecipes = recommendedRecipes
            .slice(0, splitIndex)
            .map((info) => info[0]);
        const moreRecipes = recommendedRecipes
            .slice(splitIndex)
            .map((info) => info[0]);
        return [nowRecipes, moreRecipes];
    }
    async getRecipePreviews(recipeIds) {
        const previews = await this.recipeRepository.getRecipePreviews(recipeIds);
        const processed = await this.processProcedure(previews);
        return recipeIds.map((id) => processed.find((preview) => preview.id === id));
    }
    async processProcedure(previews) {
        const splitSteps = /[0-9]+\.\s/g;
        return previews.map((preview) => {
            if (typeof preview.procedure === 'string') {
                preview.procedure = preview.procedure.split(splitSteps).slice(1);
            }
            else
                throw new Error('Invalid procedure type');
            return preview;
        });
    }
    async getFilteredRecipe(recipeFilter) {
        const previews = await this.recipeRepository.getFilteredRecipes(recipeFilter);
        return this.processProcedure(previews);
    }
    async viewRecipeDetails(recipeId) {
        const recipeInfo = await this.recipeRepository.getRecipeDetails(recipeId);
        const splitSteps = /[0-9]+\.\s/g;
        if (typeof recipeInfo.procedure === 'string')
            recipeInfo.procedure = recipeInfo.procedure.split(splitSteps).slice(1);
        else
            throw new Error('Invalid procedure type');
        return recipeInfo;
    }
    async addRecipeBookmark(userId, recipeId) {
        return this.recipeRepository.addBookmark(userId, recipeId);
    }
    async viewMyBookmark(userId) {
        const previews = await this.recipeRepository.getBookmark(userId);
        return this.processProcedure(previews);
    }
    async deleteBookmark(userId, recipeId) {
        return this.recipeRepository.deleteBookmark(userId, recipeId);
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recipe_repository_1.RecipeRepository])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map