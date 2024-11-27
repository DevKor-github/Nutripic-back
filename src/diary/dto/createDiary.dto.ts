import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiaryReqDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsDateString()
  date: Date | string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
