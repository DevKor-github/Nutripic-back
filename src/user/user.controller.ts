import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard, Public } from 'src/auth/auth.guard';
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
  @Post('create')
  createUser(@User('uid') uid: string): Promise<string> {
    return this.userService.createUser(uid);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(FirebaseAuthGuard)
  @Delete('delete')
  deleteUser(@User('uid') uid: string): Promise<string> {
    return this.userService.deleteUser(uid);
  }
}
