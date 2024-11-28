import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [AuthModule],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
