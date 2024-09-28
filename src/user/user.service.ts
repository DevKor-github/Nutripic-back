import { Injectable } from '@nestjs/common';
import CreateUserDto from 'src/auth/dtos/createUser.dto';
// import { PrismaService } from './prisma.service';
// import { Prisma, user } from '@prisma/client';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  // constructor(private prisma: PrismaService) {}

  private readonly users = [
    {
      id: 'a',
      userId: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: 'b',
      userId: '2',
      username: 'maria',
      password: 'guess',
    },
  ]; // DUMMY

  async findByName(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findByUserId(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.userId === userId);
  }

  // authService의 register에 DB 접근 로직으로 변경 예정
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.users.push({
      id: 'c',
      username: 'username',
      ...createUserDto,
    }); // DUMMY
  }
}
