import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
// import Redis from 'ioredis';
// import { InjectRedis } from '@nestjs-modules/ioredis';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailerService: MailerService,
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
