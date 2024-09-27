import { IsString } from 'class-validator';

export default class ValidateUserDto {
  @IsString()
  userId: string;

  @IsString()
  password: string;
}
