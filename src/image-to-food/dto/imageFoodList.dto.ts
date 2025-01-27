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
  storageType: StorageType = 'fridge';

  @IsString()
  @IsNotEmpty()
  class1: string = '기타';

  @IsString()
  @IsOptional()
  class2: string = '기타';

  @IsDateString()
  @IsOptional()
  expireDate: Date | string = 'unknown';
}
