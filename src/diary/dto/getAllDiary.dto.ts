import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllDiaryReqDto {
  @IsNumber()
  index: number;
}

/**
 * TODO:
 * url을 반환해 줘야할까요? 현재 와이어프레임에선 미리보기 이미지가 하루에 하나씩 보이는 듯 합니다.
 *
 * 그렇다면 모든 diary 객체에 대해 url을 반환해줄 필요는 없을 것 같은데, 이 부분은 어떻게 생각하시나요?
 *
 * 추가적으로 그렇다면 모든 diary는 반드시 이미지를 업로드하는 것으로 봐야할까요?
 */
export class GetAllDiaryResDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  url: string;

  @IsDateString({ strictSeparator: true }) // 'YYYY-MM-DDTHH:MM:SS 형식 강제 -> 연월일과 시간을 T로 구분'
  createdAt: Date | string;
}
