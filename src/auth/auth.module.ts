import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { KakaoStrategy } from './firebase/kakao.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    KakaoStrategy,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
