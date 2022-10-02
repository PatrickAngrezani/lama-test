import {UserEntity} from 'src/user/entities/user.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {BalancesService} from './balances.service';
import {balancesDto} from './dto.balances/balances.dto';
import {Request} from '@nestjs/common';

const userEntify = new UserEntity();

describe('BalancesService', () => {
  let balancesService: BalancesService;
  const BalancesDto = new balancesDto();
  const req = Request();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BalancesService,
          useValue: {
            obtainBalances: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    balancesService = module.get<BalancesService>(BalancesService);
  });

  //define
  it('should be defined', () => {
    expect(balancesService).toBeDefined();
  });

  //obatinBalances
  describe('obtainBalances', () => {
    it('should send founds to user balances', async () => {
      //act
      await balancesService.obtainBalances(req, BalancesDto);
      //assert
      expect(balancesService.obtainBalances).toBeDefined();
      expect(balancesService.obtainBalances).toHaveBeenCalled();
    });
  });

  //obatinBalances(exception)
  describe('obtainBalances(exception)', () => {
    it('should throw an exception when user receives balances', () => {
      //arrange
      jest.spyOn(balancesService, 'obtainBalances').mockRejectedValueOnce(new Error());
      //assert
      expect(balancesService.obtainBalances(req, BalancesDto)).rejects.toThrowError();
    });
  });
});
