import { StorageType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFoodDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  storageType?: StorageType;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  addedDate?: string | Date;

  @IsDateString()
  @IsOptional()
  expireDate?: string | Date;

  @IsBoolean()
  @IsOptional()
  expired?: boolean;
}
