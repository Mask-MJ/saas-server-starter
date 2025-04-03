import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { OperationController } from './operation/operation.controller';
import { OperationService } from './operation/operation.service';
import { InfoController } from '../monitor/info/info.controller';
import { InfoService } from '../monitor/info/info.service';
@Module({
  imports: [],
  controllers: [OperationController, LoginController, InfoController],
  providers: [OperationService, LoginService, InfoService],
})
export class MonitorModule {}
