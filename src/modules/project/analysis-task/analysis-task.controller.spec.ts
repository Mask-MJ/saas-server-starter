import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisTaskController } from './analysis-task.controller';
import { AnalysisTaskService } from './analysis-task.service';

describe('AnalysisTaskController', () => {
  let controller: AnalysisTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisTaskController],
      providers: [AnalysisTaskService],
    }).compile();

    controller = module.get<AnalysisTaskController>(AnalysisTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
