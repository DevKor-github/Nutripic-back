import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/utils/user.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(FirebaseAuthGuard)
  @Get('uid')
  getUid(@User('uid') uid: string) {
    return uid;
  }
}
