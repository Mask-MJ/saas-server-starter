import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisTaskService } from './analysis-task.service';

describe('AnalysisTaskService', () => {
  let service: AnalysisTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisTaskService],
    }).compile();

    service = module.get<AnalysisTaskService>(AnalysisTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
