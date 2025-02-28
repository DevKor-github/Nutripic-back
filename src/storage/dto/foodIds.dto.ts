import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class FoodIdsDto {
  @ApiProperty({ description: '삭제할 식재료 id 리스트' })
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  foodIds: number[];
}
