import { ingredientDto } from './ingredient.dto';
export declare class RecipePreviewDto {
    id: number;
    name: string;
    difficulty: number;
    cookingTime: number;
    missingIngredients?: number;
    imageUrl?: string;
    ingredient: ingredientDto[];
    procedure: string | string[];
}
