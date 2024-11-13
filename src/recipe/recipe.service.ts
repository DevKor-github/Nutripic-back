import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.respository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  getRecommandedRecipe(
    uid: string
  ): Promise<import('./dto/recipe.dto').RecipeDto[]> {
    throw new Error('Method not implemented.');

    //현재 만들 수 있음 / 재료 더 필요함 리스트 분리
    //완전 랜덤
    //알레르기 식품 제외 --> 유저 테이블 수정 필요

    //최초 3개 따로 분류
  }

  getFilteredRecipe(
    uid: string,
    ingredients: import('./dto/ingredient.dto').ingredientDto[]
  ): Promise<import('./dto/recipe.dto').RecipeDto[]> {
    throw new Error('Method not implemented.');
    //필터링 기준
    //식재료
    //난이도
  }

  addRecipeBookmark(uid: string, recipeId: number): Promise<number> {
    //bookmark
  }

  //excludeAllergic()

  //TODO 식품 카테고리 분류
  //TODO 식품 수량 트래킹 X
}
