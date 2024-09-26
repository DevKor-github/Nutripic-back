import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserService } from '../user/user.service';
import ValidateUserDto from './dtos/ValidateUser.dto';
import JwtTokenDto from './dtos/JwtToken.dto';
import CreateUserDto from './dtos/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  private logger: Logger = new Logger(AuthService.name);

  /**
   * 로그인 시, LocalStrategy를 위한 서비스 로직
   * validateUser, validatePassword
   * @param userId
   * @param pass
   */
  async validateUser(userAccount: ValidateUserDto): Promise<JwtTokenDto> {
    const { userId, password } = userAccount;
    const user = await this.userService.findByUserId(userId);
    if (user && (await this.validatePassword(password, user.password))) {
      const { id, userId, username, userType } = user;
      return { id, userId, username, userType };
    } else {
      throw new UnauthorizedException(
        '아이디 혹은 비밀번호가 일치하지 않습니다',
      );
    }
  }

  /**
   * Plain text password와 hashed password에 대한 compare진행
   * @param password 비밀번호
   * @param hash 해시된 비밀번호
   */
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Return access token & refresh token with payload
   * @param userId
   * @param password
   */
  async signIn(
    payload: JwtTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(null, {
          expiresIn: '10m',
        }),
      };
    } catch (err) {
      this.logger.error('토큰 발행에서 에러가 발생하였습니다.', err.stack);
      throw new HttpException(err.message, HttpStatus.SERVICE_UNAVAILABLE, {
        cause: err,
      });
    }
  }

  /**
   * Create New User records in DB
   * @param userId
   * @param password
   */
  async register(userInfo: CreateUserDto): Promise<User> {
    const { userId, password, email } = userInfo;
    const hashed = await bcrypt.hash(password, 13);
  }

  /**
   * Upload or Delete (Determine it later) each token at/from Database
   * @param accessToken
   * @param refreshToken
   * @todo DB 연결 후 유저 레코드 생성 로직 개발
   */
  async logout(accessToken: string | null, refreshToken: string) {
    // access token 리스트에서 삭제 -> 만료 시
    // refresh token 리스트에서 삭제 -> 로그아웃 or 만료 시
  }

  /**
   * Refresh access token to replace expired one.
   * @param payload
   * @returns New Access Token
   * @todo DB 연결 후 리스트에서 토큰 삭제하는 로직 개발
   */
  async refreshAccess(payload: JwtTokenDto): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (err) {
      this.logger.error('토큰 발행에서 에러가 발생하였습니다.', err.stack);
      throw new HttpException(err.message, HttpStatus.SERVICE_UNAVAILABLE, {
        cause: err,
      });
    }
  }

  /**
   * RTR (Refresh Token Rotation)
   * Delete old refresh token
   * @param refreshToken
   * @returns New Refresh Token
   */
  async refreshRefresh(): Promise<string> {
    try {
      return await this.jwtService.signAsync(null, { expiresIn: '10m' });
    } catch (err) {
      this.logger.error('토큰 발행에서 에러가 발생하였습니다.', err.stack);
      throw new HttpException(err.message, HttpStatus.SERVICE_UNAVAILABLE, {
        cause: err,
      });
    }
  }
}
