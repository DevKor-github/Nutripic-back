import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ingredientDto } from './ingredient.dto';

export class RecipePreviewDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  difficulty: number;

  @IsNumber()
  @IsNotEmpty()
  cookingTime: number;

  @IsNumber()
  @IsOptional()
  missingIngredients?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  ingredient: ingredientDto[];

  @IsString()
  @IsNotEmpty()
  procedure: string | string[];
}
