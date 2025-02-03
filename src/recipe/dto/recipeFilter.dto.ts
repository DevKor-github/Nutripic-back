import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RecipeFilterDto {
  @ApiProperty({
    description: '레시피 난이도',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  difficulty?: number;

  @ApiProperty({
    description: '조리 시간',
    example: 15,
  })
  @IsNumber()
  @IsOptional()
  cookingTime?: number;
}
