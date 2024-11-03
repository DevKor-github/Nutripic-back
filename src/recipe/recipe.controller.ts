import { Controller } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  //레시피 추천 (현재 식재료 기반)

  //레시피 검색 (식재료?)

  //레시피 북마크
}
