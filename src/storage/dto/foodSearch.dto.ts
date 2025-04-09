import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FoodSearchDto {
  @ApiProperty({ description: '식재료 정보 id' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '식재료 대분류' })
  @IsString()
  class1: string;

  @ApiProperty({ description: '식재료 소분류' })
  @IsString()
  class2: string;
}
