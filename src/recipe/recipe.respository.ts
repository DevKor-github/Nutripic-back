import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';

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

  async getRecommendedRecipes(userFoodList: string[]): Promise<RecipeDto[]> {
    return this.prisma.recipe.findMany({
      where: {
        recipeIngredient: {
          every: {
            name: { in: userFoodList },
          },
        },
      },
      include: {
        recipeIngredient: true,
      },
    });
  }
}
