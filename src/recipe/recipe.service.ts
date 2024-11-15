import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.respository';
import { RecipeDto } from './dto/recipe.dto';
import { ingredientDto } from './dto/ingredient.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  /** 추천 레시피 리스트
   *
   * @param uid
   * @returns RecipePreview[][] (id, name, difficulty, cookingTime)
   *
   * 유저가 가진 식재료로 만들 수 있는 레시피 리스트와
   * 한두가지 식재료를 추가하면 만들 수 있는 레시피 리스트 반환
   * [[만들 수 있는 레시피], [식재료 추가 필요 레시피]]
   *
   * 추가 필요한 식재료 수는 검색 결과에 따라 유연하게 결정
   * ? (세부사항 결정 필요, 최대 n개 식재료 추가?)
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

    return [recommendedRecipes, moreRecipes];
  }

  /** 필터링 된 레시피 리스트
   *
   * @param uid
   * @param recipeFilter
   * @returns recipePreview []
   *
   * 레시피 필터링: 난이도, 조리 시간
   * 전체 검색 - 유저가 가진 식재료 고려하지 않음
   * ? 고려할 경우는 getRecommandedRecipe 반환 결과를 프론트에서 필터링?
   */
  async getFilteredRecipe(
    recipeFilter: RecipeFilterDto
  ): Promise<RecipePreviewDto[]> {
    return this.recipeRepository.getFilteredRecipes(recipeFilter);
  }

  /** 레시피 상세정보
   *
   * @param recipeId
   * @returns Recipe Details
   *
   * 상세 레시피 정보 반환 (id, 이름, 재료, 상세 설명 등)
   */
  async viewRecipeDetails(recipeId: number): Promise<RecipeDto> {
    return this.recipeRepository.getRecipeDetails(recipeId);
  }

  async addRecipeBookmark(uid: string, recipeId: number): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async viewMyBookmark(uid: string): Promise<RecipePreviewDto> {
    throw new Error('Method not implemented.');
  }
  //excludeAllergic()

  //TODO 식품 카테고리 분류
  //DONE 식품 수량 트래킹 X
  //TODO 유저 알레르기 정보 저장, 필터링
}
