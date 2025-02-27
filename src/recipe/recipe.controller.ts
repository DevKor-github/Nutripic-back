import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { User } from 'src/utils/decorator/user.decorator';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/auth.guard';
import { RecipeSearchDto } from './dto/recipeSearch.dto';

@ApiTags('Recipe')
@ApiBearerAuth()
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  private logger: Logger = new Logger(RecipeController.name);

  @ApiOperation({ summary: '유저 소유 식재료 기반 레시피 추천' })
  @ApiOkResponse({
    type: Number,
    isArray: true,
    description:
      '[[만들 수 있는 레시피 id], [식재료 추가 필요한 레시피 id], [현재 가진 식재료를 사용하는 레시피 id]]',
    example: [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ],
  })
  @Get('/recommended')
  @HttpCode(HttpStatus.OK)
  getRecommendedRecipe(@User() userId: string): Promise<number[][]> {
    this.logger.log(`Get recommended recipe by user: ${userId}`);
    return this.recipeService.getRecommandedRecipe(userId);
  }

  @ApiOperation({ summary: '레시피 프리뷰 리스트' })
  @ApiBody({
    description: '레시피 ID 리스트',
    schema: {
      type: 'object',
      properties: {
        recipeIds: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 2, 3],
        },
      },
    },
  })
  @ApiOkResponse({
    type: RecipePreviewDto,
    isArray: true,
    description: '레시피 프리뷰 리스트',
  })
  @Get('/previews')
  @HttpCode(HttpStatus.OK)
  getRecipePreviews(
    @Body('recipeIds') recipeIds: number[]
  ): Promise<RecipePreviewDto[]> {
    this.logger.log(`Get recipe previews of ${recipeIds}`);
    return this.recipeService.getRecipePreviews(recipeIds);
  }

  //레시피 검색 (난이도, 시간)
  @ApiOperation({ summary: '레시피 필터링 (난이도, 시간)' })
  @ApiBody({
    type: RecipeFilterDto,
    required: true,
    description: '레시피 필터',
  })
  @ApiOkResponse({
    type: RecipePreviewDto,
    isArray: true,
    description: '레시피 프리뷰 리스트',
  })
  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  getFilteredRecipe(
    @Body() recipeFilter: RecipeFilterDto
  ): Promise<RecipePreviewDto[]> {
    this.logger.log(`Get filtered recipe by ${recipeFilter}`);
    return this.recipeService.getFilteredRecipe(recipeFilter);
  }

  //상세 레시피
  @ApiOperation({ summary: '레시피 상세 정보' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: '레시피 ID',
  })
  @ApiOkResponse({
    type: RecipeDto,
    description: '레시피 상세 정보',
  })
  @Get('/detail/:id')
  @HttpCode(HttpStatus.OK)
  getRecipeDetail(@Param('id') recipeId: number): Promise<RecipeDto> {
    this.logger.log(`Get recipe detail of ${recipeId}`);
    return this.recipeService.viewRecipeDetails(recipeId);
  }

  @ApiOperation({ summary: '레시피 이름 검색' })
  @ApiQuery({
    name: 'keyword',
    type: String,
    description: '레시피 이름 검색 키워드',
  })
  @ApiOkResponse({
    type: RecipeSearchDto,
    isArray: true,
    description: '검색된 레시피 리스트',
  })
  @Get('/search')
  @HttpCode(HttpStatus.OK)
  searchRecipe(@Query('keyword') keyword: string): Promise<RecipeSearchDto[]> {
    this.logger.log(`Search recipe by keyword: ${keyword}`);
    if (!keyword.trim()) return Promise.resolve([]);
    return this.recipeService.searchRecipe(keyword);
  }

  //레시피 북마크 추가
  @ApiOperation({ summary: '레시피 북마크 추가' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        recipeId: { type: 'number', example: 1 },
      },
    },
    required: true,
    description: '북마크 레시피 ID',
  })
  @ApiCreatedResponse({
    type: Number,
    description: '북마크 레시피 ID',
    example: 1,
  })
  @Post('/bookmark/add')
  @HttpCode(HttpStatus.CREATED)
  addRecipeBookmark(
    @User() userId: string,
    @Body('recipeId') recipeId: number
  ): Promise<number> {
    this.logger.log(`Add recipe bookmark`);
    return this.recipeService.addRecipeBookmark(userId, recipeId);
  }

  @ApiOperation({ summary: '북마크 레시피 리스트' })
  @ApiOkResponse({
    type: RecipePreviewDto,
    isArray: true,
    description: '북마크 레시피 리스트',
  })
  @Get('/bookmark/view')
  @HttpCode(HttpStatus.OK)
  viewRecipeBookmark(@User() userId): Promise<RecipePreviewDto[]> {
    this.logger.log(`View my bookmark`);
    return this.recipeService.viewMyBookmark(userId);
  }

  @ApiOperation({ summary: '북마크 레시피 삭제' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        recipeId: { type: 'number', example: 1 },
      },
    },
    required: true,
    description: '북마크 레시피 ID',
  })
  @ApiOkResponse({
    type: Number,
    description: '삭제된 북마크 레시피 ID',
    example: 1,
  })
  @Delete('/bookmark/delete')
  @HttpCode(HttpStatus.OK)
  deleteRecipeBookmark(
    @User() userId,
    @Body('recipeId') recipeId: number
  ): Promise<number> {
    this.logger.log(`Delete recipe bookmark`);
    return this.recipeService.deleteBookmark(userId, recipeId);
  }
}
