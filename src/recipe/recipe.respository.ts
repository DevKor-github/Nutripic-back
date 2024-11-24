import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { plainToInstance } from 'class-transformer';
import { RecipeFilterDto } from './dto/recipeFilter.dto';

@Injectable()
export class RecipeRepository {
  constructor(private prisma: PrismaService) {}

  async getUserFoodList(userId: string): Promise<string[]> {
    const foodList = await this.prisma.food.findMany({
      where: { userId },
      select: { name: true },
    });

    return foodList.map((food) => food.name);
  }

  async getRecommendedRecipes(
    userFoodList: string[],
    requiredIngredients: number
  ): Promise<RecipePreviewDto[]> {
    /**
     * 레시피 프리뷰 (id, name, difficulty, cookingTime) 반환
     *
     * Parameter :
     *  userFoodList = 유저가 가진 식재료 이름
     *  requiredIngredients = 추가로 필요한 식재료 갯수
     *
     * Query:
     *  inverted index 사용
     *  레시피ID와 레시피에 사용되는 개별 식재료 이름을 저장하는 IngredientRecipeIndex에서
     *  유저가 가진 식재료를 검색,
     *  해당 식재료로 만들 수 있는 레시피 ID를 찾는다.
     *  이때 각 레시피ID가 몇 번 나오는지 COUNT(*)해, 각 레시피ID에 필요한 식재료 개수 (ingredient_count)와 비교한다.
     *  레시피ID가 출현 횟수와 레시피에 필요한 식재료 개수가 같다면, 유저가 해당 레시피에 필요한 식재료를 모두 가지고 있음
     */

    const recipe = await this.prisma.$queryRaw<
      Array<{
        id: number;
        name: string;
        difficulty: number;
        cookingTime: number;
        missingIngredient: number;
      }>
    >`
      SELECT r.id, r.name, r.difficulty, r.cooking_time, rc.COUNT
      FROM (
      SELECT COUNT(*), recipe_id
        FROM ingredient_recipe_index
        WHERE ingredient IN ${userFoodList}
        GROUP BY recipe_id
      ) AS rc
      NATURAL JOIN recipe AS r
      WHERE r.ingredient_count <= rc.COUNT + ${requiredIngredients}
      ORDER BY rc.COUNT ASC;
    `;

    return plainToInstance(RecipePreviewDto, recipe);
  }

  async getFilteredRecipes(
    recipeFilter: RecipeFilterDto
  ): Promise<RecipePreviewDto[]> {
    return this.prisma.recipe.findMany({
      where: {
        ...(recipeFilter.difficulty
          ? { difficulty: recipeFilter.difficulty }
          : {}),
        ...(recipeFilter.cookingTime
          ? { cookingTime: recipeFilter.cookingTime }
          : {}),
      },
      select: {
        id: true,
        name: true,
        difficulty: true,
        cookingTime: true,
      },
    });
  }

  async getRecipeDetails(recipeId: number): Promise<RecipeDto> {
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

  async addBookmark(userId: string, recipeId: number): Promise<number> {
    const bookmark = await this.prisma.recipeBookmark.create({
      data: { userId, recipeId },
    });
    return bookmark.recipeId;
  }

  async getBookmark(userId: string): Promise<RecipePreviewDto[]> {
    const bookmarkList = await this.prisma.recipeBookmark.findMany({
      where: { userId },
      include: {
        recipe: {
          select: {
            id: true,
            name: true,
            difficulty: true,
            cookingTime: true,
          },
        },
      },
    });

    return bookmarkList.map((bookmark) => bookmark.recipe);
  }

  async deleteBookmark(userId: string, recipeId: number): Promise<number> {
    return (
      await this.prisma.recipeBookmark.delete({
        where: {
          userId_recipeId: { userId, recipeId },
        },
      })
    ).recipeId;
  }
}
