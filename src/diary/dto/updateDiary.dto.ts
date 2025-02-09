import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateDiaryReqDto {
  @ApiProperty({ description: '다이어리 본문', example: '본문 예시입니다.' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: '원하는 다이어리 등록 일자',
    example: new Date('2024-11-27T19:30:00.000Z'),
    type: Date || String,
  })
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

export class UpdateDiaryResDto {
  @ApiProperty({ description: '다이어리 ID', example: 7 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: '다이어리 본문', example: '본문 예시입니다.' })
  @IsString()
  @IsNotEmpty()
  body: string;

  // 기존 등록 이미지입니다. 이미지 수정은 없습니다.
  @ApiProperty({
    description: '업로드 이미지 객체 URL',
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: '원하는 다이어리 등록 일자',
    example: new Date('2024-11-12T19:30:00.000Z'),
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: '다이어리 등록 식사 시간 (1: 아침 2: 점심 3: 저녁)',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  mealTime: number;
}
