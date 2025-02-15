import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validation } from './utils';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './cores/exceptions/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { FirebaseAuthGuard } from './auth/auth.guard';
import { StorageModule } from './storage/storage.module';
import { DiaryModule } from './diary/diary.module';
import { AwsModule } from './aws/aws.module';
import { RecipeModule } from './recipe/recipe.module';
import { ImageToFoodModule } from './image-to-food/imageToFood.module';
import { WinstonModule } from 'nest-winston';
import { LogModule } from './log/log.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: validation,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    StorageModule,
    DiaryModule,
    AwsModule,
    RecipeModule,
    ImageToFoodModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint()
          ),
        }),
      ],
    }),
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
