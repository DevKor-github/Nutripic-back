export default class CreateUserDto {
  userId: string;
  password: string;
  email: string;
  // 추가 유저 등록 시 필요한 정보 추가 예정
  // 단순 유저 정보는 각 상황에 따라 분리되어 관리될 것이므로 user/dtos에 생성
}
