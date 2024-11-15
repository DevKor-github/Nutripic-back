import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.respository';
import { RecipeDto } from './dto/recipe.dto';
import { ingredientDto } from './dto/ingredient.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /**
   *
   * @param uid
   * @returns RecipePreview[][] (id, name, difficulty, cookingTime)
   *
   * 유저가 가진 식재료로 만들 수 있는 레시피 리스트와
   * 한두가지 식재료를 추가하면 만들 수 있는 레시피 리스트 반환
   * [[만들 수 있는 레시피], [식재료 추가 필요 레시피]]
   *
   * 추가 필요한 식재료 수는 검색 결과에 따라 유연하게 결정
   * TODO: (세부사항 결정 필요, 최대 n개 식재료 추가?)
   */
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

  /**
   *
   * @param uid
   * @param recipeFilter
   */
  async getFilteredRecipe(
    recipeFilter: RecipeFilterDto
  ): Promise<RecipePreviewDto[]> {
    return this.recipeRepository.getFilteredRecipes(recipeFilter);
  }

  async addRecipeBookmark(uid: string, recipeId: number): Promise<number> {
    //bookmark
  }

  //excludeAllergic()

  //TODO 식품 카테고리 분류
  //TODO 식품 수량 트래킹 X
}
