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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  private logger: Logger = new Logger(AuthController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  getHello(): string {
    return 'Hello Auth!';
  }

  // @Header('Authorization', () => 'none')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: ValidateUserDto })
  @Post('login')
  async login(
    @Body() validateUserDto: ValidateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id, userId, username, userType } = req.user as JwtTokenDto;
    if (userId !== validateUserDto.userId) {
      throw new UnauthorizedException('토큰의 유저 정보와 일치하지 않습니다.');
    }
    const { accessToken, refreshToken } = await this.authService.signIn({
      id,
      userId,
      username,
      userType,
    });
    res.setHeader('authorization', `Bearer ${accessToken}`);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.json(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { userId, password, email } = createUserDto;
    const user = await this.userService.findByUserId(userId);
    if (user) {
      // 아이디, 비밀번호에 대한 validation(정규표현식)은 프론트에서 처리하기!
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }
    await this.authService.register({ userId, password, email });
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post('logout')
  // @Header('Authorization', 'none')
  async logout(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers?.authorization as string;
    const refreshToken = req.cookies?.refresh_token as string;
    if (!(accessToken && refreshToken)) {
      throw new UnauthorizedException('토큰이 전송되지 않았습니다.');
    }
    await this.authService.logout(accessToken, refreshToken);
    res.setHeader('authorization', '');
    res.clearCookie('refresh_token');
    return res.json({ message: '로그아웃 되었습니다.' });
  }

  // Silent Token Refresh
  @Public() // refresh-token만 검증하도록 추후 설정 변경 필요
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  // @Header('Authorization', 'none')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken)
      throw new UnauthorizedException('토큰이 전송되지 않았습니다.');
    const payload = req?.user as JwtTokenDto;
    const newAccessToken = await this.authService.refreshAccess(payload);
    res.setHeader('authorization', `Bearer ${newAccessToken}`);
    const newRefreshToken = await this.authService.refreshRefresh();
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    await this.authService.logout(null, refreshToken);
  }
}
