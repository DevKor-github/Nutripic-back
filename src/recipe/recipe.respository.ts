import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { number } from 'joi';
import { plainToInstance } from 'class-transformer';

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
    JOIN ingredient i ON i.recipeId = r.id
    GROUP BY r.id
    HAVING
      cardinality(array(
        SELECT unnest(array_agg(i.name)) EXCEPT SELECT unnest(${userFoodList}::test[])
      )) = ${requiredIngredients}
    `;

    return plainToInstance(RecipePreviewDto, recipes);
  }
}
