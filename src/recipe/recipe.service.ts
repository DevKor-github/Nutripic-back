import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.respository';
import { RecipeDto } from './dto/recipe.dto';
import { ingredientDto } from './dto/ingredient.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async getRecommandedRecipe(uid: string): Promise<RecipePreviewDto[][]> {
    const userFoodList = await this.recipeRepository.getUserFoodList(uid);
    const moreIngredient = 1;

    const recommendedRecipes =
      await this.recipeRepository.getRecommendedRecipes(userFoodList, 0);
    const moreRecipes = await this.recipeRepository.getRecommendedRecipes(
      userFoodList,
      moreIngredient
    );

    //레시피의 수가 너무 적다면
    //moreIngredient를 increment해서 더 많은 레시피 가져오기
    //moreIngredient의 최대값 또는 레시피 개수로 제한하기
    return [recommendedRecipes, moreRecipes];
  }

  async getFilteredRecipe(
    uid: string,
    ingredients: ingredientDto[]
  ): Promise<RecipeDto[]> {
    throw new Error('Method not implemented.');
    //필터링 기준
    //식재료
    //난이도
  }

  async addRecipeBookmark(uid: string, recipeId: number): Promise<number> {
    //bookmark
  }

  //excludeAllergic()

  //TODO 식품 카테고리 분류
  //TODO 식품 수량 트래킹 X
}
