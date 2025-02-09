import { ApiProperty } from '@nestjs/swagger';
import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({
    description: 'fridge/freezer/room',
    example: 'fridge',
  })
  @IsString()
  @IsNotEmpty()
  storageType: StorageType;

  @ApiProperty({
    description: '식재료 이름',
    example: '토마토',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '대분류', example: '채소' })
  @IsString()
  @IsNotEmpty()
  class1: string;

  @ApiProperty({ description: '중분류' })
  @IsString()
  @IsOptional()
  class2?: string;

  @ApiProperty({ description: '표시 아이콘 URL' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({
    description: '추가 날짜',
    default: new Date(),
  })
  @IsDateString()
  @IsOptional() //기본값: 추가한 일시
  addedDate?: string | Date;

  @ApiProperty({
    description: '유통기한',
    example: '2024-11-12T19:30:00.000Z',
  })
  @IsDateString()
  @IsOptional() //TODO: empty? 기본 값 논의
  expireDate?: string | Date;
}
