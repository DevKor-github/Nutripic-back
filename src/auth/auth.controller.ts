import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
  @Post('kakao')
  async handleKakaoCallback(@Body() body: { uid: string }) {
    const { uid } = body;
    const firebaseToken = await this.authService.createFirebaseToken(uid);
    return { firebaseToken };
  }
}
