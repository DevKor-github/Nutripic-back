import {
  UseGuards,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Body,
  Req,
  Res,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LocalAuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
// DTOs
import CreateUserDto from './dtos/createUser.dto';
import JwtTokenDto from './dtos/JwtToken.dto';
import ValidateUserDto from './dtos/ValidateUser.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  private logger: Logger = new Logger(AuthController.name);

  //Auth Controller test; remove later
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): string {
    return 'Hello Auth!';
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('kakao'))
  @Post('kakao')
  async handleKakaoCallback(@Body() body: { uid: string }) {
    const { uid } = body;
    const firebaseToken = await this.authService.createFirebaseToken(uid);
    return {firebaseToken};
  }

}
