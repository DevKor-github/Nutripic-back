import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// diaryID를 DTO 대신 Parameter로 받도록 수정
// export class GetDiaryReqDto {
//   @IsNumber()
//   @IsNotEmpty()
//   id: number;
// }

export class GetDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  body: string;

  @IsString()
  url: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
