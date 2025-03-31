import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

console.log('path', __dirname + '/templates');

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const transport = configService.get<string>('MAIL_TRANSPORT');
        const mailUser = configService.get<string>('MAIL_USER');
        const appName = configService.get<string>('APP_NAME');
        return {
          transport,
          defaults: { from: `${appName} <${mailUser}>` },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
    }),
  ],
})
export class MailModule {}
