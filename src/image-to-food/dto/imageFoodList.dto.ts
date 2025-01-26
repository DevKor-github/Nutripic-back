import { ApiProperty } from '@nestjs/swagger';
import { StorageType } from '@prisma/client';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class imageFoodListDto {
  @ApiProperty({
    description: '식재료 이름',
    example: '사과',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  storageType: StorageType;

  @IsString()
  @IsNotEmpty()
  category1: string;

  @IsString()
  @IsOptional()
  category2: string;

  @IsDateString()
  @IsOptional()
  expireDate: Date | string;
}
