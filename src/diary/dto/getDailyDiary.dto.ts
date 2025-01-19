import { IsDateString, IsNumber, IsString } from 'class-validator';

export class GetDailyDiaryResDto {
  @IsNumber()
  id: number;

  @IsString()
  url: string;

  @IsDateString()
  date: Date | string;
}
