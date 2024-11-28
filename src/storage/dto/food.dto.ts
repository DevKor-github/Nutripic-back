import { ApiProperty } from '@nestjs/swagger';
import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FoodDto {
  @ApiProperty({ description: '식재료 id - 자동 생성 (입력 필요 없음)' })
  @IsString()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: '식재료 주인 유저' })
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({ description: 'fridge/freezer/room' })
  @IsString()
  @IsNotEmpty()
  storageType: StorageType;

  @ApiProperty({ description: '식재료 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '대분류' })
  @IsString()
  @IsNotEmpty()
  class1: string;

  @ApiProperty({ description: '중분류' })
  @IsString()
  @IsOptional()
  class2?: string;

  @ApiProperty({ description: '추가 날짜' })
  @IsDateString()
  @IsOptional()
  addedDate?: string | Date; //TODO: 백엔드에서 추가

  @ApiProperty({ description: '유통기한' })
  @IsDateString()
  @IsOptional() //TODO: empty? 기본 값 논의
  expireDate?: string | Date;

  @ApiProperty({ description: '유통기한 지남 여부' })
  @IsBoolean()
  @IsOptional() //기본값: false (유통기한 지나지 않음)
  expired?: boolean;
}
