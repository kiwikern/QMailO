import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  // TODO: Remove any when merged: https://github.com/nestjs/nest/pull/5485
  app.useLogger(configService.get<LogLevel[]>('LOG_LEVELS') as any);

  const options = new DocumentBuilder()
    .setTitle('Qmailo')
    .setDescription('The API of the .qmail files organizer')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('files', 'Manage your .qmail files')
    .addTag('auth', 'Obtain an auth token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('PORT')!);
}
bootstrap();
