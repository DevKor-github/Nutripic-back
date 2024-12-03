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

  @ApiProperty({ description: '대분류' })
  @IsString()
  @IsOptional()
  class1?: string;

  @ApiProperty({ description: '중분류' })
  @IsString()
  @IsOptional()
  class2?: string;

  @ApiProperty({ description: '표시 아이콘 URL' })
  @IsString()
  @IsOptional()
  icon?: string;

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
