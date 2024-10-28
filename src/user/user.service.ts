import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //유저 생성
  async createUser(uid: string): Promise<string> {
    if (this.checkUserExists(uid))
      throw new BadRequestException('이미 존재하는 uid 입니다.');

    const newUser = await this.prisma.user.create({
      data: { uid },
    });

    return newUser.uid;
  }

  //유저 삭제
  async deleteUser(uid: string): Promise<string> {
    if (!this.checkUserExists(uid))
      throw new BadRequestException('존재하지 않는 uid 입니다.');

    const deletedUser = await this.prisma.user.delete({ where: { uid } });
    return deletedUser.uid;
  }

  async checkUserExists(uid: string): Promise<boolean> {
    if (await this.prisma.user.findUnique({ where: { uid } })) return true;
    else return false;
  }
}
