import { Test, TestingModule } from '@nestjs/testing';
import { InfoService } from './info.service';
import systemInfo from 'systeminformation';
import { vitest, Mock } from 'vitest';

vitest.mock('systeminformation');

describe('InfoService', () => {
  let service: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoService],
    }).compile();

    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return system information', async () => {
    const mockCpu = {
      cores: 8,
      brand: 'Intel',
      manufacturer: 'Intel',
      speed: 3.5,
    };
    const mockMem = {
      total: 16 * 1024 * 1024 * 1024,
      free: 8 * 1024 * 1024 * 1024,
      used: 8 * 1024 * 1024 * 1024,
    };
    const mockOsInfo = {
      platform: 'linux',
      release: '5.15.0',
      arch: 'x64',
      hostname: 'test-host',
    };

    (systemInfo.cpu as Mock).mockResolvedValue(mockCpu);
    (systemInfo.mem as Mock).mockResolvedValue(mockMem);
    (systemInfo.osInfo as Mock).mockResolvedValue(mockOsInfo);

    const result = await service.systemInfo();

    expect(result).toEqual({
      cpu: {
        cores: mockCpu.cores,
        brand: mockCpu.brand,
        manufacturer: mockCpu.manufacturer,
        speed: `${mockCpu.speed}GHz`,
      },
      memory: {
        total: '16.00GB',
        free: '8.00GB',
        used: '8.00GB',
        usage: '50.00%',
      },
      osInfo: {
        platform: mockOsInfo.platform,
        release: mockOsInfo.release,
        arch: mockOsInfo.arch,
        hostname: mockOsInfo.hostname,
      },
    });
  });
});
