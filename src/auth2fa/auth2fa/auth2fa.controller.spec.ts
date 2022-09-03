import { Test, TestingModule } from '@nestjs/testing';
import { Auth2faController } from './auth2fa.controller';

describe('Auth2faController', () => {
  let controller: Auth2faController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth2faController],
    }).compile();

    controller = module.get<Auth2faController>(Auth2faController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
