import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { RecipePreviewDto } from './dto/recipePreview.dto';
import { RecipeFilterDto } from './dto/recipeFilter.dto';
export declare class RecipeRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getUserFoodList(userId: string): Promise<string[]>;
    getRecommendedRecipes(userFoodList: string[], requiredIngredients: number): Promise<number[][]>;
    getFilteredRecipes(recipeFilter: RecipeFilterDto): Promise<RecipePreviewDto[]>;
    getRecipePreviews(recipeIds: number[]): Promise<RecipePreviewDto[]>;
    getRecipeDetails(recipeId: number): Promise<RecipeDto>;
    addBookmark(userId: string, recipeId: number): Promise<number>;
    getBookmark(userId: string): Promise<RecipePreviewDto[]>;
    deleteBookmark(userId: string, recipeId: number): Promise<number>;
}
