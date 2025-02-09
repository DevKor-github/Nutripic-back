import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiaryReqDto {
  @ApiProperty({
    description: '다이어리 본문',
    example: '본문 예시입니다.',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: '원하는 다이어리 등록 일자',
    example: new Date('2024-11-27T19:30:00.000Z'),
    default: new Date(),
    type: Date || String,
  })
  @IsDateString()
  date: Date | string;

  @ApiProperty({
    description: '업로드 이미지 객체 URL',
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: '다이어리 등록 식사 시간 (1: 아침 2: 점심 3: 저녁)',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  mealTime: number;
}
