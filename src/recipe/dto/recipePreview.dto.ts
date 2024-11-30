import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
