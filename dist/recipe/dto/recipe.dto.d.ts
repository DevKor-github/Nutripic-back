import { ingredientDto } from './ingredient.dto';
export declare class RecipeDto {
    id: number;
    name: string;
    ingredient: ingredientDto[];
    procedure: string | string[];
    difficulty: number;
    cookingTime: number;
}
