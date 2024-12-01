import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAllDiaryResDto {
  @ApiProperty({ description: '다이어리 ID', default: 7 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
}
