import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseConfig } from './firebase/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    FirebaseService,
    FirebaseConfig,
    FirebaseAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, FirebaseService, FirebaseAuthGuard],
})
export class AuthModule {}
