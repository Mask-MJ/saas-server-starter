import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
// import Redis from 'ioredis';
// import { InjectRedis } from '@nestjs-modules/ioredis';
import { Cache } from 'cache-manager';
import { PrismaService } from './common/datebase/prisma.extension';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailerService: MailerService,
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getHello(): Promise<string> {
    const redisData = await this.cacheManager.get('key');
    await this.cacheManager.mset([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ]);
    console.log('redisData', redisData);
    const redisData2 = await this.cacheManager.mget(['key1', 'key2']);
    console.log('redisData2', redisData2);
    const user = await this.prismaService.client.user.create({
      data: { name: 'mask2', email: 'xxx@qq.com' },
    });

    console.log('user', user);
    // await this.prismaService.client.user.findMany({});
    const [users, meta] = await this.prismaService.client.user
      .paginate()
      .withPages({
        limit: 10,
        page: 1,
        includePageCount: true,
      });
    console.log('users', users);
    console.log('meta', meta);
    return 'Hello World!';
  }

  getHello2(): string {
    return 'Hello World!v2';
  }

  getMail() {
    this.mailerService
      .sendMail({
        to: '1249097292@qq.com', // list of receivers
        from: '617473294@qq.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        template: 'welcome', // template file name
        context: { name: 'mask' },
      })
      .then(() => {
        console.log('Mail sent successfully');
      })
      .catch((error) => {
        console.error('Error sending mail:', error);
      });
  }
}
