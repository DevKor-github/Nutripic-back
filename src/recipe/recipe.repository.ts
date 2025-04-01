import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { plainToInstance } from 'class-transformer';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipeRepository {
  constructor(private prisma: PrismaService) {}

  async getUserFoodList(userId: string): Promise<string[]> {
    const foodList = await this.prisma.food.findMany({
      where: { userId },
      select: { name: true },
    }); //TODO: 삭제하고 recommendedRecipe의 raw query에 join 추가? 쿼리 두번보단 join 추가 쿼리 비교하기 아마 후자가 빠를듯

    return foodList.map((food) => food.name);
  }

  async getRecommendedRecipes(
    userFoodList: string[],
    requiredIngredients: number
  ): Promise<number[][]> {
    /**
     * [레시피ID, 추가 필요한 식재료 개수] 리스트 반환
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

    const rawRecipeInfo = await this.prisma.$queryRaw<
      Array<{
        recipe_id: number;
        missing_ingredients: number;
      }>
    >`
      WITH recipe_with_missing AS (
        SELECT rc.recipe_id, CAST(rc.ingredient_count-rc.id_count AS INTEGER) AS missing_ingredients
        FROM (
        SELECT COUNT(*) AS id_count, recipe_id, ingredient_count
          FROM ingredient_recipe_index
          WHERE ingredient_name IN (${Prisma.join(userFoodList)})
          GROUP BY recipe_id, ingredient_count
        ) AS rc
      )
      SELECT * 
      FROM recipe_with_missing
      WHERE missing_ingredients <= ${requiredIngredients}
      ORDER BY missing_ingredients ASC;
    `;
    const result: number[][] = rawRecipeInfo.map((info) => [
      info.recipe_id,
      info.missing_ingredients,
    ]);
    return result;
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
          ? { cookingTime: { lte: recipeFilter.cookingTime } }
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
      // select: {
      //   id: true,
      //   name: true,
      //   difficulty: true,
      //   cookingTime: true,
      //   imageUrl: true,
      // },
    });
  }

  async getRecipePreviews(recipeIds: number[]): Promise<RecipePreviewDto[]> {
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
      // select: {
      //   id: true,
      //   name: true,
      //   difficulty: true,
      //   cookingTime: true,
      //   imageUrl: true,
      // },
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
          include: {
            ingredient: {
              select: {
                ingredientName: true,
                amount: true,
              },
            },
          },
          // select: {
          //   id: true,
          //   name: true,
          //   difficulty: true,
          //   cookingTime: true,
          //   imageUrl: true,
          // },
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
