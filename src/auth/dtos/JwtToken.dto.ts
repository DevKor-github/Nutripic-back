import { IsString } from 'class-validator';

export default class JwtTokenDto {
  @IsString()
  id: string; // uuid 설정

  @IsString()
  userId: string; // 실질적 id가 될 예정

  @IsString()
  username: string; // 유저 실명 or 닉네임 -> 서비스마다 달라질 에정

  @IsString()
  userType: number; // 유저 권한 -> 어드민, 일반회원, 사용금지회원
}
