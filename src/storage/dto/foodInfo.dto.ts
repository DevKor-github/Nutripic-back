import { ApiProperty } from '@nestjs/swagger';
import { StorageType } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class FoodInfoDto {
  @ApiProperty({ description: '식재료 정보 id' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '식재료 저장 분류' })
  @IsString()
  storageType: StorageType;

  @ApiProperty({ description: '식재료 대분류' })
  @IsString()
  class1: string;

  @ApiProperty({ description: '식재료 소분류' })
  @IsString()
  class2: string;

  @ApiProperty({ description: '식재료 아이콘 이름' })
  @IsString()
  icon: string;

  @ApiProperty({ description: '식재료 유통기한 (일수)' })
  @IsNumber()
  expireDate: number;
}
