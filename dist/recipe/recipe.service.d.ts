import { RecipeRepository } from './recipe.repository';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
export declare class RecipeService {
    private readonly recipeRepository;
    constructor(recipeRepository: RecipeRepository);
    getRecommandedRecipe(uid: string): Promise<number[][]>;
    getRecipePreviews(recipeIds: number[]): Promise<RecipePreviewDto[]>;
    processProcedure(previews: RecipePreviewDto[]): Promise<RecipePreviewDto[]>;
    getFilteredRecipe(recipeFilter: RecipeFilterDto): Promise<RecipePreviewDto[]>;
    viewRecipeDetails(recipeId: number): Promise<RecipeDto>;
    addRecipeBookmark(userId: string, recipeId: number): Promise<number>;
    viewMyBookmark(userId: string): Promise<RecipePreviewDto[]>;
    deleteBookmark(userId: string, recipeId: number): Promise<number>;
}
