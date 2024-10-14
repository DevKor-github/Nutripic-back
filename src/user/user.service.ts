import { Injectable } from '@nestjs/common';
import CreateUserDto from 'src/auth/dtos/createUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //유저 생성
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  //유저 삭제
  async deleteUser(): Promise<boolean> {
    return true;
  }
}
