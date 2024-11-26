import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// index를 DTO 대신 Parameter로 받도록 수정
// export class GetAllDiaryReqDto {
//   @IsNumber()
//   index: number;
// }

export class GetAllDiaryResDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  url: string;

  @IsDate()
  date: Date;
}
