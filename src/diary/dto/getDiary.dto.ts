import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  urls: string[];

  // getAllDiaryResDto를 통해 이미 createdAt 데이터를 client가 보유하고 있으므로 중복해서 전송할 필요 X
  // 프론트와의 상의 후 주석 해제 혹은 삭제 예정
  //   @IsDateString()
  //   @IsNotEmpty()
  //   createdAt: Date | string;
}
