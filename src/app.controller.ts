import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get()
  @Version('2')
  getHello2(): string {
    return this.appService.getHello2();
  }

  @Get('mail')
  getMail() {
    return this.appService.getMail();
  }
}
