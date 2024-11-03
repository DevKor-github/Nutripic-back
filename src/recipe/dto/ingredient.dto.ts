import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ingredientDto {
  @ApiProperty({ description: '레시피에 쓰일 식재료 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '수량' })
  @IsNumber()
  @IsOptional()
  amount: number;
}
