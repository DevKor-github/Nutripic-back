import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class FoodDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storageType: StorageType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
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
