import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateDiaryReqDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsDateString()
  date: Date | string;
}

export class UpdateDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  body: string;

  // 기존 등록 이미지입니다. 이미지 수정은 없습니다.
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
