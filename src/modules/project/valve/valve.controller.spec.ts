import { Test, TestingModule } from '@nestjs/testing';
import { ValveController } from './valve.controller';
import { ValveService } from './valve.service';

describe('ValveController', () => {
  let controller: ValveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValveController],
      providers: [ValveService],
    }).compile();

    controller = module.get<ValveController>(ValveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
