import { Module } from '@nestjs/common';
import { AnalysisTaskService } from './analysis-task.service';
import { AnalysisTaskController } from './analysis-task.controller';

@Module({
  controllers: [AnalysisTaskController],
  providers: [AnalysisTaskService],
})
export class AnalysisTaskModule {}
