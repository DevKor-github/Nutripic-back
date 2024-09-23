import {
  UseGuards,
  Controller,
  Post,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Body,
  Req,
  Res,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
// DTOs
import CreateUserDto from './dtos/createUser.dto';
import JwtTokenDto from './dtos/JwtToken.dto';
import ValidateUserDto from './dtos/ValidateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger: Logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(LocalAuthGuard)
  // @Header('Authorization', () => 'none')
  @Post('login')
  async login(@Body() vaildateUserDto: ValidateUserDto, @Res() res: Response) {
    const { userId, password } = vaildateUserDto;
    const userInfo = await this.authService.validateUser({ userId, password });
    const { accessToken, refreshToken } =
      await this.authService.signIn(userInfo);
    res.header('Authorization', `Bearer ${accessToken}`);
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    return res.json(userInfo);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { userId, password, email } = createUserDto;
    const user = 'user';
    if (user) {
      // 아이디, 비밀번호에 대한 validation(정규표현식)은 프론트에서 처리하기!
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }
    await this.authService.register({ userId, password, email });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('logout')
  // @Header('Authorization', 'none')
  async logout(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers?.accessToken as string;
    const refreshToken = req.cookies?.refresh_token as string;
    if (!(accessToken && refreshToken)) {
      throw new UnauthorizedException('토큰이 전송되지 않았습니다.');
    }
    await this.authService.logout(accessToken, refreshToken);
    res.clearCookie('refresh_token');
  }

  // Silent Token Refresh
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  // @Header('Authorization', 'none')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken)
      throw new UnauthorizedException('토큰이 전송되지 않았습니다.');
    const payload = req?.user as JwtTokenDto;
    const newAccessToken = await this.authService.refreshAccess(payload);
    res.header('Authorization', newAccessToken);
    const newRefreshToken = await this.authService.refreshRefresh();
    res.cookie('refresh_token', newRefreshToken, { httpOnly: true });
    await this.authService.logout(null, refreshToken);
  }
}
