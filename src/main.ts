import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from 'src/common/filters/all-exception.filter';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  // 获取配置
  const PORT = configService.get<number>('PORT', 3000);
  const PREFIX = configService.get<string>('PREFIX', 'api');
  const CORS = configService.get<boolean>('CORS', false);
  const VERSION = configService.get<string>('VERSION');
  // let defaultVersion: string[] = [VERSION];
  // if (VERSION.indexOf(',')) {
  //   defaultVersion = VERSION.split(',');
  //   app.enableVersioning({
  //     type: VersioningType.URI,
  //     defaultVersion,
  //   });
  // }
  const defaultVersion = VERSION ? VERSION.split(',') : VERSION_NEUTRAL;
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion,
  });
  // 设置 api 访问前缀
  app.setGlobalPrefix(PREFIX);
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));
  // 跨域
  if (CORS) {
    app.enableCors();
  }
  // 版本
  if (VERSION) {
    app.enableVersioning({ type: VersioningType.URI, defaultVersion });
  }
  await app.listen(PORT);
  console.log(
    `服务启动成功 `,
    '\n',
    '服务地址',
    `http://localhost:${PORT}/${PREFIX}/`,
    '\n',
    '文档地址',
    `http://localhost:${PORT}/doc/`,
  );
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
