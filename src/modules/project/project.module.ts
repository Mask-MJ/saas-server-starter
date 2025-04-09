import { Module } from '@nestjs/common';

import { MinioService } from 'src/common/minio/minio.service';
import { AnalysisTaskController } from './analysis-task/analysis-task.controller';
import { DeviceController } from './device/device.controller';
import { FactoryController } from './factory/factory.controller';
import { ValveController } from './valve/valve.controller';
import { AnalysisTaskService } from './analysis-task/analysis-task.service';
import { DeviceService } from './device/device.service';
import { FactoryService } from './factory/factory.service';
import { ValveService } from './valve/valve.service';

@Module({
  imports: [],
  controllers: [
    FactoryController,
    DeviceController,
    ValveController,
    AnalysisTaskController,
  ],
  providers: [
    FactoryService,
    DeviceService,
    ValveService,
    AnalysisTaskService,
    MinioService,
  ],
})
export class ProjectModule {}
