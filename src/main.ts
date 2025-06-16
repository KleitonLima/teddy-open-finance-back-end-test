import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupDbConnection } from './database/connection.db';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api/v0');
  app.useGlobalPipes(new ValidationPipe());
  swaggerConfig(app);
  await setupDbConnection();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
