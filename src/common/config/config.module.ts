import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { validate } from './env.validation';

const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, '.env'];
console.log('envFilePath:', envFilePath);

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,
      validate,
    }),
    Config,
  ],
})
export class ConfigModule {}
