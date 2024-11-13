import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDiaryReqDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  body: string;

  @IsString()
  url: string;

  // getAllDiaryResDto를 통해 이미 createdAt 데이터를 client가 보유하고 있으므로 중복해서 전송할 필요 X
  //   @IsDateString()
  //   @IsNotEmpty()
  //   createdAt: Date | string;
}
