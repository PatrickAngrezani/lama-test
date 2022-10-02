import {BalancesService} from './balances.service';
import {Test, TestingModule} from '@nestjs/testing';
import {BalancesController} from './balances.controller';
import {UserEntity} from 'src/user/entities/user.entity';
import {balancesDto} from './dto.balances/balances.dto';
import {Request} from '@nestjs/common';

const userEntify = new UserEntity();
const BalancesDto = new balancesDto();
const req = Request();

describe('BalancesController', () => {
  let balancesController: BalancesController;
  let balancesService: BalancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalancesController],
      providers: [
        {
          provide: BalancesService,
          useValue: {
            obtainBalances: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    balancesController = module.get<BalancesController>(BalancesController);
    balancesService = module.get<BalancesService>(BalancesService);
  });

  //define
  it('should be defined', () => {
    expect(balancesController).toBeDefined();
    expect(balancesService).toBeDefined();
  });

  //obtainBalances
  describe('obtainBalances', () => {
    it('should give founds to user balances', async () => {
      //act
      await balancesController.obtainBalances(req, BalancesDto);
      //assert
      expect(balancesService.obtainBalances).toBeDefined();
      expect(balancesService.obtainBalances).toHaveBeenCalled();
    });
  });

  //obtainBalances(exception)
  describe('obtainBalances(exception)', () => {
    it('should throw an exception when user receives balances', () => {
      //arrange
      jest.spyOn(balancesService, 'obtainBalances').mockRejectedValueOnce(new Error());
      //assert
      expect(balancesController.obtainBalances(req, BalancesDto)).rejects.toThrowError();
    });
  });
});
