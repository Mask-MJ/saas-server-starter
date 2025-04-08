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
import { AuthModule } from './modules/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { SystemModule } from './modules/system/system.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MonitorModule } from './modules/monitor/monitor.module';
import { ValveModule } from './modules/project/valve/valve.module';
import { FactoryModule } from './modules/project/factory/factory.module';
import { DeviceModule } from './modules/project/device/device.module';
import { AnalysisTaskModule } from './modules/project/analysis-task/analysis-task.module';
@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
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
    AuthModule,
    EventEmitterModule.forRoot(),
    RouterModule.register([
      { path: 'system', module: SystemModule },
      { path: 'monitor', module: MonitorModule },
      { path: 'auth', module: AuthModule },
    ]),
    SystemModule,
    MonitorModule,
    ValveModule,
    FactoryModule,
    DeviceModule,
    AnalysisTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
