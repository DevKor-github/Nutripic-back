import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { RecipeDto } from './dto/recipe.dto';
import { ingredientDto } from './dto/ingredient.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  //레시피 추천 (현재 식재료 기반)
  @UseGuards(FirebaseAuthGuard)
  @Get('view_recipes')
  @HttpCode(HttpStatus.OK)
  getRecommendedRecipe(@User() uid: string): Promise<RecipeDto[]> {
    return this.recipeService.getRecommandedRecipe(uid);
  }

  //레시피 검색 (식재료?)
  @UseGuards(FirebaseAuthGuard)
  @Get('filter_recipes')
  @HttpCode(HttpStatus.OK)
  getFilteredRecipe(
    @User() uid: string,
    @Body() ingredients: ingredientDto[]
  ): Promise<RecipeDto[]> {
    return this.recipeService.getFilteredRecipe(uid, ingredients);
  }

  //레시피 북마크 추가
  @UseGuards(FirebaseAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addRecipeBookmark(
    @User() uid: string,
    @Body() recipeId: number
  ): Promise<number> {
    return this.recipeService.addRecipeBookmark(uid, recipeId);
  }
}
