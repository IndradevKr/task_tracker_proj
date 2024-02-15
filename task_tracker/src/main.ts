import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: process.env.FE_URL,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
