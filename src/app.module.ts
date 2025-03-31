import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { MailModule } from './common/mail/mail.module';
import { CustomPrismaModule } from 'nestjs-prisma';
@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASSWORD');
        return {
          stores: [
            createKeyv({
              url: `redis://${redisHost}:${redisPort}`,
              password: redisPassword,
            }),
          ],
        };
      },
    }),
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => extendedPrismaClient,
    }),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
