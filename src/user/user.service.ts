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

  //유저
  async getUser(): Promise<User>{
    //TODO: 헤더 토큰으로 uid 확인해서 유저 정보 리턴
  } 

  //Unique key로 유저 찾기
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }



  //TODO: delete dummy
  // private readonly users = [
  //   {
  //     id: 'a',
  //     userId: '1',
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: 'b',
  //     userId: '2',
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ]; // DUMMY

  // async findByName(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  // async findByUserId(userId: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.userId === userId);
  // }

  // authService의 register에 DB 접근 로직으로 변경 예정
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   return this.users.push({
  //     id: 'c',
  //     username: 'username',
  //     ...createUserDto,
  //   }); // DUMMY
  // }
}
