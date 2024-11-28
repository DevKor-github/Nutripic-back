import { Injectable } from '@nestjs/common';
import { StorageType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(uid: string): Promise<string> {
    const newUser = await this.prisma.user.create({
      data: { uid },
    });

    await this.prisma.storage.createMany({
      data: [
        { userId: uid, type: StorageType.freezer },
        { userId: uid, type: StorageType.fridge },
        { userId: uid, type: StorageType.room },
      ],
    });

    return newUser.uid;
  }

  async deleteUser(uid: string): Promise<string> {
    const deletedUser = await this.prisma.user.delete({ where: { uid } });
    return deletedUser.uid;
  }

  async checkUserExists(uid: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { uid },
    });
    if (user !== null) {
      return true;
    } else return false;
  }
}
