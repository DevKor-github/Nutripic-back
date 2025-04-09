import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecipeSearchDto {
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
}
