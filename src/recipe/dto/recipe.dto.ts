import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ingredientDto } from './ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty({
    description: '레시피 ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: '레시피 이름',
    example: '토마토 스파게티',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '레시피에 쓰이는 식재료 리스트',
    example: [
      {
        ingredientName: '토마토',
        amount: '1개',
      },
      {
        ingredientName: '스파게티면',
        amount: '100g',
      },
    ],
  })
  @IsString()
  @IsNotEmpty()
  ingredient: ingredientDto[];

  @ApiProperty({
    description: '레시피 과정',
    example: ['토마토를 손질한다.', '스파게티면을 삶는다.'],
  })
  @IsString()
  @IsOptional() //레시피 선택 시 상세 레시피 리턴
  procedure: string | string[];

  @ApiProperty({
    description: '레시피 난이도',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  difficulty: number;

  @ApiProperty({
    description: '조리 시간',
    example: 15,
  })
  @IsNumber()
  @IsNotEmpty()
  cookingTime: number;
}
