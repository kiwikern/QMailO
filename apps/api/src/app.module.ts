import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import * as Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api/.env',
      validationSchema: Joi.object({
        LOG_LEVELS: Joi.array()
          .has(Joi.string().valid('error', 'warn', 'info', 'debug', 'verbose'))
          .default(['error', 'warn']),
        JWT_EXPIRES_IN_DAYS: Joi.number().default(30),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PASSWORD_HASH: Joi.string().required(),
        QMAILO_PATH: Joi.string().required(),
        PORT: Joi.number().default(30000),
      }),
    }),
    LoggerModule,
  ],
})
export class AppModule {}
