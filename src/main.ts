import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
