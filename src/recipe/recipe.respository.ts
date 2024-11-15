import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { number } from 'joi';
import { plainToInstance } from 'class-transformer';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
import { ingredientDto } from './dto/ingredient.dto';

@Injectable()
export class RecipeRepository {
  constructor(private prisma: PrismaService) {}

  async getUserFoodList(uid: string): Promise<string[]> {
    const foodList = await this.prisma.food.findMany({
      where: { userId: uid },
      select: { name: true },
    });

    return foodList.map((food) => food.name);
  }

  async getRecommendedRecipes(
    userFoodList: string[],
    requiredIngredients: number
  ): Promise<RecipePreviewDto[]> {
    //TODO: typing raw result
    /**
     * 레시피 프리뷰 (id, name, difficulty, cookingTime) 반환
     *
     * Parameter :
     *  userFoodList = 유저가 가진 식재료 이름
     *  requiredIngredients = 추가로 필요한 식재료 갯수
     *
     * Query :
     *  각 레시피에 필요한 식재료 리스트와 유저 식재료 리스트 비교
     *  레시피 식재료 중 유저에게 없는 식재료가 ${requiredIngredients}개인 레시피 반환
     *  ex) requiredIngredients = 0일 경우, 유저가 당장 만들 수 있는 레시피를 리턴
     */

    const recipes = await this.prisma.$queryRaw<
      Array<{
        id: number;
        name: string;
        difficulty: number;
        cookingTime: number;
      }>
    >`
    SELECT r.id, r.name, r.difficulty, r.cooking_time
    FROM recipe r
    JOIN recipe_ingredient i ON i.recipe_id = r.id
    GROUP BY r.id
    HAVING
      cardinality(array(
        SELECT unnest(array_agg(i.name)) EXCEPT SELECT unnest(${userFoodList})
      )) = ${requiredIngredients}
    `;

    return plainToInstance(RecipePreviewDto, recipes);
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
        recipeIngredient: {
          select: {
            name: true,
            amount: true,
          },
        },
      },
    });
  }
}
