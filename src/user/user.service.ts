import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //유저 생성
  async createUser(uid: string): Promise<string> {
    if (await this.userRepository.checkUserExists(uid))
      throw new ConflictException('이미 존재하는 uid 입니다.');

    const newUser = this.userRepository.createUser(uid);
    if (!newUser) throw new BadGatewayException('유저 생성에 실패했습니다.');
    return newUser;
  }

  //유저 삭제
  async deleteUser(uid: string): Promise<string> {
    if (await !this.userRepository.checkUserExists(uid))
      throw new NotFoundException('존재하지 않는 uid 입니다.');

    return this.userRepository.deleteUser(uid);
  }
}
