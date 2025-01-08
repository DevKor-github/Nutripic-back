"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const prisma_service_1 = require("./prisma/prisma.service");
const config_1 = require("@nestjs/config");
function logMemoryUsage(stage) {
    const memoryUsage = process.memoryUsage();
    common_1.Logger.log(`Memory usage at ${stage}: 
    RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB, 
    Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB, 
    Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'warn', 'error'],
    });
    const configService = app.get(config_1.ConfigService);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use(cookieParser());
    const prismaService = app.get(prisma_service_1.PrismaService);
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NUTRIPIC')
        .setDescription('API description')
        .setVersion('1.0')
        .addServer(`${configService.get('BACKEND_URL')}`, 'Dev environment')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(`${configService.get('SWAGGER_ENDPOINT')}`, app, document);
    await app.listen(configService.get('SERVER_PORT'), '0.0.0.0');
    logMemoryUsage('after app listen');
    const logger = new common_1.Logger('bootstrap');
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map