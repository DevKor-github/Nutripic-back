import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteFoodDto {
  @ApiProperty({ description: '식재료 id' })
  @IsNumber()
  @IsNotEmpty()
  id: number[];
}
