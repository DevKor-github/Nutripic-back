import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsInt,
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
  amount: number;

  @IsString()
  category: string;

  @IsDateString()
  addedDate: string;

  @IsDateString()
  expireDate: string;

  @IsBoolean()
  expired: boolean;
}
