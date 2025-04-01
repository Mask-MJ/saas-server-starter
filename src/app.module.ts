import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'src/common/config/config.module';
import { LogsModule } from 'src/common/logger/logs.module';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { MailModule } from 'src/common/mail/mail.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { extendedPrismaClient } from '@/common/datebase/prisma.extension';
import { UserModule } from './modules/system/user/user.module';
import { AuthenticationModule } from './modules/auth/authentication/authentication.module';
@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const REDIS_HOST = configService.get<string>('REDIS_HOST');
        const REDIS_PORT = configService.get<number>('REDIS_PORT');
        const REDIS_PASSWORD = configService.get<string>('REDIS_PASSWORD');
        return {
          stores: [
            createKeyv({
              url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
              password: REDIS_PASSWORD,
            }),
          ],
        };
      },
    }),
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DATABASE_PORT = configService.get<number>('DATABASE_PORT');
        const DATABASE_HOST = configService.get<string>('DATABASE_HOST');
        const DATABASE_USER = configService.get<string>('DATABASE_USER');
        const DATABASE_PASSWORD =
          configService.get<string>('DATABASE_PASSWORD');
        const DATABASE_DB = configService.get<string>('DATABASE_DB');
        const datasourceUrl = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}`;
        return extendedPrismaClient({ datasourceUrl });
      },
    }),
    MailModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
