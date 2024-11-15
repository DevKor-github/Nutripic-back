import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  cooking_time: number;
}
