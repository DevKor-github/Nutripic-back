import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
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
   * @returns number[][] (recipeId, missingIngredients)
   *
   * 유저가 가진 식재료로 만들 수 있는 레시피 리스트와
   * 한두가지 식재료를 추가하면 만들 수 있는 레시피 리스트 반환
   * [[만들 수 있는 레시피], [식재료 추가 필요 레시피]]
   *
   * 추가 필요한 식재료 수는 검색 결과에 따라 유연하게 결정
   * ? (세부사항 결정 필요, 최대 n개 식재료 추가?)
   */
  async getRecommandedRecipe(uid: string): Promise<number[][]> {
    const userFoodList = await this.recipeRepository.getUserFoodList(uid);
    if (userFoodList.length === 0) return [[], []]; //식재료 없음
    const moreIngredients = 2;

    const recommendedRecipes =
      await this.recipeRepository.getRecommendedRecipes(
        userFoodList,
        moreIngredients
      );

    //만들 수 있는 레시피와 없는 레시피 구분
    //레시피ID만 반환
    const splitIndex = recommendedRecipes.findIndex((recipe) => recipe[1] > 0);
    if (splitIndex === -1)
      return [recommendedRecipes.map((info) => info[0]), []]; //모든 레시피 만들 수 있는 경우

    const nowRecipes = recommendedRecipes
      .slice(0, splitIndex)
      .map((info) => info[0]);
    const moreRecipes = recommendedRecipes
      .slice(splitIndex)
      .map((info) => info[0]);

    return [nowRecipes, moreRecipes];
  }

  /** 레시피 프리뷰 정보 리스트
   *
   * @param recipeIds
   * @returns recipePreview []
   *
   * 프론트에서 레시피ID 리스트를 요청으로 보내면,
   * 해당 레시피들의 프리뷰를 보냄 (id, 이름, 난이도, 조리시간)
   */
  async getRecipePreviews(recipeIds: number[]): Promise<RecipePreviewDto[]> {
    const previews = await this.recipeRepository.getRecipePreviews(recipeIds);
    const splitSteps = /[0-9]+\.\s/g;
    const processed = previews.map((preview) => {
      if (typeof preview.procedure === 'string') {
        preview.procedure = preview.procedure.split(splitSteps).slice(1);
      } else throw new Error('Invalid procedure type');
      return preview;
    });

    return recipeIds.map((id) =>
      processed.find((preview) => preview.id === id)
    );
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

  //북마크 관련 기능
  async addRecipeBookmark(userId: string, recipeId: number): Promise<number> {
    return this.recipeRepository.addBookmark(userId, recipeId);
  }

  async viewMyBookmark(userId: string): Promise<RecipePreviewDto[]> {
    return this.recipeRepository.getBookmark(userId);
  }

  async deleteBookmark(userId: string, recipeId: number): Promise<number> {
    return this.recipeRepository.deleteBookmark(userId, recipeId);
  }
  //excludeAllergic()

  //TODO 식품 카테고리 분류
  //TODO 유저 알레르기 정보 저장, 필터링
}
