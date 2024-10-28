import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteFoodDto {
  @ApiProperty({ description: '식재료 id' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: '삭제 수량' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
