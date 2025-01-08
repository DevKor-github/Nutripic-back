import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    private logger;
    getRecommendedRecipe(userId: string): Promise<number[][]>;
    getRecipePreviews(recipeIds: number[]): Promise<RecipePreviewDto[]>;
    getFilteredRecipe(recipeFilter: RecipeFilterDto): Promise<RecipePreviewDto[]>;
    getRecipeDetail(recipeId: number): Promise<RecipeDto>;
    addRecipeBookmark(userId: string, recipeId: number): Promise<number>;
    viewRecipeBookmark(userId: any): Promise<RecipePreviewDto[]>;
    deleteRecipeBookmark(userId: any, recipeId: number): Promise<number>;
}
