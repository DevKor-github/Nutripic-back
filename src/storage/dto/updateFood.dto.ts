import { ApiProperty } from '@nestjs/swagger';
import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFoodDto {
  @ApiProperty({ description: '식재료 id' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'fridge/freezer/room' })
  @IsString()
  @IsOptional()
  storageType?: StorageType;

  @ApiProperty({ description: '식재료 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '수량' })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: '분류' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: '추가 날짜' })
  @IsDateString()
  @IsOptional()
  addedDate?: string | Date;

  @ApiProperty({ description: '유통기한' })
  @IsDateString()
  @IsOptional()
  expireDate?: string | Date;

  @ApiProperty({ description: '유통기한 지남 여부' })
  @IsBoolean()
  @IsOptional()
  expired?: boolean;
}
