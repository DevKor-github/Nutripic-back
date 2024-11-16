import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDiaryReqDto {
  @IsString()
  body: string;
}

/**
 * TODO:
 * 새 Diary를 생성한 뒤 어느 URL로 리다이렉트 해줄지에 대한 정보가 필요할 것 같습니다.
 *
 * 1. 작성한 diary의 상세 정보를 보여주는 페이지로 리다이렉트할 경우 해당 diary의 id를 반환해주면 될 것 같습니다.
 * id를 반환해주지 않고 GetDiaryResDto 형식과 같이 상세 정보를 반환해주는 방식으로 구현할 수도 있을 것 같습니다.
 *
 * 2. 작성한 diary의 목록을 보여주는 페이지로 리다이렉트할 경우 ResDto가 필요없지 않을까요..?
 */
export class CreateDiaryResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  urls?: string[];
}
