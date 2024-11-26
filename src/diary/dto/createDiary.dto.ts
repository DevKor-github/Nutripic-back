import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDiaryReqDto {
  @IsString()
  body: string;

  @IsDateString()
  date: Date | string;
}

// 별도의 DTO 없이 status code에 따라 클라이언트에서 처리하도록 합의.
// export class CreateDiaryResDto {
//   @IsNumber()
//   @IsNotEmpty()
//   id: number;

//   @IsString()
//   @IsOptional()
//   urls?: string[];
// }
