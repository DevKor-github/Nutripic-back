import {
  Injectable,
  ExecutionContext,
  Logger,
  UnauthorizedException,
  SetMetadata,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase/firebase.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

//Firebase 토큰 가드
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private logger: Logger = new Logger(FirebaseAuthGuard.name);
  private auth: admin.auth.Auth;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly reflector: Reflector
  ) {
    this.auth = firebaseService.getAuth();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //퍼블릭 루트라면 토큰 검사 X
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      this.logger.warn('Missing or Malformed authorization token');
      throw new UnauthorizedException(
        '토큰이 없거나 형식이 올바르지 않습니다.'
      );
    }

    try {
      const decodedToken = await this.auth.verifyIdToken(token);
      request.user = decodedToken;
      this.logger.log(`Successfully authenticated: user ${decodedToken.uid}`);
      return true;
    } catch (err) {
      this.logger.error('Invalid or expired token', err.stack);
      throw new UnauthorizedException('유효하지 않거나 만료된 토큰입니다.');
    }
  }

  private extractToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    } else
      throw new UnauthorizedException(
        '토큰이 없거나 유효하지 않은 형식입니다.'
      );
  }
}
