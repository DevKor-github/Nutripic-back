import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(FirebaseAuthGuard)
  @Get('uid')
  getUid(@User('uid') uid: string): string {
    return uid;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FirebaseAuthGuard)
  @Get('create')
  create(@User('uid') uid: string): Promise<string> {
    return this.userService.createUser(uid);
  }
}
