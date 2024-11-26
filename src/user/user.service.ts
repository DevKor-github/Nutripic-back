import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //유저 생성
  async createUser(uid: string): Promise<string> {
    if (this.userRepository.checkUserExists(uid))
      throw new BadRequestException('이미 존재하는 uid 입니다.');

    return this.userRepository.createUser(uid);
  }

  //유저 삭제
  async deleteUser(uid: string): Promise<string> {
    if (!this.userRepository.checkUserExists(uid))
      throw new BadRequestException('존재하지 않는 uid 입니다.');

    return this.userRepository.deleteUser(uid);
  }
}
