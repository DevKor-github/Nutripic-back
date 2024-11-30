import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ingredientDto {
  @ApiProperty({ description: '레시피에 쓰일 식재료 이름' })
  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @ApiProperty({ description: '수량' })
  @IsString()
  @IsOptional()
  amount: string;
}
