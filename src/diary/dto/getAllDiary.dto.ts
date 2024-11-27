import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAllDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
