import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import ValidateUserDto from './dtos/ValidateUser.dto';
import JwtTokenDto from './dtos/JwtToken.dto';
import CreateUserDto from './dtos/createUser.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  async createFirebaseToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }
}
