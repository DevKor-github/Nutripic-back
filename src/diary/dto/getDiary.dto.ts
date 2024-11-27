import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  url: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
