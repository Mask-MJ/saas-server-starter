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
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async getHello() {
    // const user = await this.prisma.client.user.create({
    //   data: { name: 'mask2', email: 'xxx@qq.com' },
    // });

    // console.log('user', user);
    // await this.prisma.client.user.findMany({});
    const [rows, meta] = await this.prisma.client.user
      .paginate()
      .withPages({ page: 1 });
    return { rows, ...meta };
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
