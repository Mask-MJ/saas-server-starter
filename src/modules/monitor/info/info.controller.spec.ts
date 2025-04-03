import { Test, TestingModule } from '@nestjs/testing';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { of } from 'rxjs';
import { vitest } from 'vitest';

describe('InfoController', () => {
  let controller: InfoController;
  let service: InfoService;

  beforeEach(async () => {
    const mockInfoService = {
      systemInfo: vitest.fn().mockReturnValue(of({ status: 'ok' })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoController],
      providers: [
        {
          provide: InfoService,
          useValue: mockInfoService,
        },
      ],
    }).compile();

    controller = module.get<InfoController>(InfoController);
    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('systemInfo', () => {
    it('should call InfoService.systemInfo and return the result', async () => {
      const mockResult = {
        cpu: {
          cores: 8,
          brand: 'Intel',
          manufacturer: 'Intel',
          speed: '3.50GHz',
        },
        memory: {
          total: '16.00GB',
          free: '8.00GB',
          used: '8.00GB',
          usage: '50.00%',
        },
        osInfo: {
          platform: 'linux',
          release: '5.15.0',
          arch: 'x64',
          hostname: 'test-host',
        },
      };
      vitest.spyOn(service, 'systemInfo').mockResolvedValue(mockResult);

      const result = await controller.systemInfo();

      expect(result).toEqual(mockResult);
    });
  });
});
