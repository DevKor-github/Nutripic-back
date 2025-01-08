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
exports.RecipeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RecipeRepository = class RecipeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserFoodList(userId) {
        const foodList = await this.prisma.food.findMany({
            where: { userId },
            select: { name: true },
        });
        return foodList.map((food) => food.name);
    }
    async getRecommendedRecipes(userFoodList, requiredIngredients) {
        const rawRecipeInfo = await this.prisma.$queryRaw `
      WITH recipe_with_missing AS (
        SELECT rc.recipe_id, CAST(rc.ingredient_count-rc.id_count AS INTEGER) AS missing_ingredients
        FROM (
        SELECT COUNT(*) AS id_count, recipe_id, ingredient_count
          FROM ingredient_recipe_index
          WHERE ingredient_name IN (${client_1.Prisma.join(userFoodList)})
          GROUP BY recipe_id, ingredient_count
        ) AS rc
      )
      SELECT * 
      FROM recipe_with_missing
      WHERE missing_ingredients <= ${requiredIngredients}
      ORDER BY missing_ingredients ASC;
    `;
        const result = rawRecipeInfo.map((info) => [
            info.recipe_id,
            info.missing_ingredients,
        ]);
        return result;
    }
    async getFilteredRecipes(recipeFilter) {
        return this.prisma.recipe.findMany({
            where: {
                ...(recipeFilter.difficulty
                    ? { difficulty: recipeFilter.difficulty }
                    : {}),
                ...(recipeFilter.cookingTime
                    ? { cookingTime: recipeFilter.cookingTime }
                    : {}),
            },
            include: {
                ingredient: {
                    select: {
                        ingredientName: true,
                        amount: true,
                    },
                },
            },
        });
    }
    async getRecipePreviews(recipeIds) {
        return this.prisma.recipe.findMany({
            where: {
                id: { in: recipeIds },
            },
            include: {
                ingredient: {
                    select: {
                        ingredientName: true,
                        amount: true,
                    },
                },
            },
        });
    }
    async getRecipeDetails(recipeId) {
        return this.prisma.recipe.findUnique({
            where: { id: recipeId },
            include: {
                ingredient: {
                    select: {
                        ingredientName: true,
                        amount: true,
                    },
                },
            },
        });
    }
    async addBookmark(userId, recipeId) {
        const bookmark = await this.prisma.recipeBookmark.create({
            data: { userId, recipeId },
        });
        return bookmark.recipeId;
    }
    async getBookmark(userId) {
        const bookmarkList = await this.prisma.recipeBookmark.findMany({
            where: { userId },
            include: {
                recipe: {
                    include: {
                        ingredient: {
                            select: {
                                ingredientName: true,
                                amount: true,
                            },
                        },
                    },
                },
            },
        });
        return bookmarkList.map((bookmark) => bookmark.recipe);
    }
    async deleteBookmark(userId, recipeId) {
        return (await this.prisma.recipeBookmark.delete({
            where: {
                userId_recipeId: { userId, recipeId },
            },
        })).recipeId;
    }
};
exports.RecipeRepository = RecipeRepository;
exports.RecipeRepository = RecipeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecipeRepository);
//# sourceMappingURL=recipe.repository.js.map