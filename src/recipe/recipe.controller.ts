import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  //레시피 추천 (현재 식재료 기반)
  @UseGuards(FirebaseAuthGuard)
  @Get('recommended')
  @HttpCode(HttpStatus.OK)
  getRecommendedRecipe(@User() uid: string): Promise<RecipePreviewDto[][]> {
    return this.recipeService.getRecommandedRecipe(uid);
  }

  //레시피 검색 (난이도, 시간)
  @UseGuards(FirebaseAuthGuard)
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  getFilteredRecipe(
    @Body() recipeFilter: RecipeFilterDto
  ): Promise<RecipePreviewDto[]> {
    return this.recipeService.getFilteredRecipe(recipeFilter);
  }

  //상세 레시피
  @UseGuards(FirebaseAuthGuard)
  @Get('detail/:id')
  @HttpCode(HttpStatus.OK)
  getRecipeDetail(@Param('id') recipeId: number): Promise<RecipeDto> {
    return this.recipeService.viewRecipeDetails(recipeId);
  }

  //레시피 북마크 추가
  @UseGuards(FirebaseAuthGuard)
  @Post('bookmark/add')
  @HttpCode(HttpStatus.CREATED)
  addRecipeBookmark(
    @User() uid: string,
    @Body() recipeId: number
  ): Promise<number> {
    return this.recipeService.addRecipeBookmark(uid, recipeId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('bookmark/view')
  @HttpCode(HttpStatus.OK)
  viewRecipeBookmark(@User() userId): Promise<RecipePreviewDto[]> {
    return this.recipeService.viewMyBookmark(userId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete('bookmark/delete')
  @HttpCode(HttpStatus.OK)
  deleteRecipeBookmark(
    @User() userId,
    @Body() recipeId: number
  ): Promise<number> {
    return this.recipeService.deleteBookmark(userId, recipeId);
  }
}
