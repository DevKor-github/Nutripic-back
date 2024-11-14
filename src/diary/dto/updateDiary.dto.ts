import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDiaryReqDto {
  @IsString()
  body: string;
}

/**
 * CreatedDiaryResDto와 마찬가지로 어느 페이지로 리다이렉트 해줄지에 대한 정보가 필요할 것 같습니다.
 * 일단 update의 경우에는 수정한 diary 상세 정보를 보여주는 페이지로 리다이렉트하는 게 자연스러울 것 같아서
 * 해당 상황에 맞게 dto를 구현해놓겠습니다.
 */
export class UpdateDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  body: string;

  // 이미지 업데이트 로직 완성 후 주석 해제
  // @IsString()
  // url: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: Date | string;
}
