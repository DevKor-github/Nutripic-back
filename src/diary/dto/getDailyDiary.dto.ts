import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDailyDiaryResDto {
  @IsNumber()
  id: number;

  @IsString()
  url: string;

  @IsDateString()
  date: Date | string;

  @ApiProperty({
    description: '다이어리 등록 식사 시간 (1: 아침 2: 점심 3: 저녁)',
      example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    mealTime: number;
}
