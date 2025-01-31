import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ingredientDto {
  @ApiProperty({
    description: '레시피에 쓰이는 식재료 이름',
    example: '토마토',
  })
  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @ApiProperty({
    description: '수량',
    example: '1개',
  })
  @IsString()
  @IsOptional()
  amount: string;
}
