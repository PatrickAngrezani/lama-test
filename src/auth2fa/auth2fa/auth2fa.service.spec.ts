import { Test, TestingModule } from '@nestjs/testing';
import { Auth2faService } from './auth2fa.service';

describe('Auth2faService', () => {
  let service: Auth2faService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth2faService],
    }).compile();

    service = module.get<Auth2faService>(Auth2faService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
