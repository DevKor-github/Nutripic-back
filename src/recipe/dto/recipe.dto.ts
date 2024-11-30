import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ingredientDto } from './ingredient.dto';

export class RecipeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ingredient: ingredientDto[];

  @IsString()
  @IsOptional() //레시피 선택 시 상세 레시피 리턴
  procedure: string;

  @IsNumber()
  @IsNotEmpty()
  difficulty: number;

  @IsNumber()
  @IsNotEmpty()
  cookingTime: number;
}
