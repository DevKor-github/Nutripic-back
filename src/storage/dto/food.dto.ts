import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class FoodDto {
  @IsString()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storageType: StorageType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  addedDate: string;

  @IsDateString()
  @IsNotEmpty() //TODO: empty? 기본 값 논의
  expireDate: string;

  @IsBoolean()
  @IsOptional() //기본값: false (유통기한 지나지 않음)
  expired: boolean;
}
