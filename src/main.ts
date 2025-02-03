import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

function logMemoryUsage(stage: string) {
  const memoryUsage = process.memoryUsage();
  Logger.log(
    `Memory usage at ${stage}: 
    RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB, 
    Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB, 
    Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const configService = app.get(ConfigService);

  //CORS
  app.enableCors();

  //ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.use(cookieParser()); // refresh token을 cookie로 관리하기 위한 미들웨어

  //prisma
  const prismaService = app.get(PrismaService);
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('NUTRIPIC')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer(`${configService.get('BACKEND_URL')}`, 'Dev environment')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${configService.get('SWAGGER_ENDPOINT')}`,
    app,
    document
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(configService.get('SERVER_PORT'), '0.0.0.0');
  logMemoryUsage('after app listen');

  const logger = new Logger('bootstrap');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
