import {UserEntity} from 'src/user/entities/user.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {TransactionsService} from './transactions.service';
import {TransactionDto} from './dto.transactions/transaction.dto';
import {Request, Response} from '@nestjs/common';

const transactionDto = new TransactionDto();
const userEntify = new UserEntity();
const req = Request();
const res = Response();

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            cryptoTransactions: jest.fn().mockReturnValue(userEntify),
            fiatTransactions: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  //define
  it('should be defined', () => {
    expect(transactionsService).toBeDefined();
  });

  //cryptoTransaction
  describe('cryptoTransactions', () => {
    it('should make a crypto transfer', async () => {
      //act
      await transactionsService.cryptoTransactions(transactionDto, req, res);
      //assert
      expect(transactionsService.cryptoTransactions).toBeDefined();
      expect(transactionsService.cryptoTransactions).toHaveBeenCalled();
    });
  });

  //cryptoTransaction(exception)
  describe('cryptoTransaction(exception)', () => {
    it('should throw an exception in crypto transaction', () => {
      //arrange
      jest
        .spyOn(transactionsService, 'cryptoTransactions')
        .mockRejectedValueOnce(new Error());
      //assert
      expect(
        transactionsService.cryptoTransactions(transactionDto, req, res),
      ).rejects.toThrowError();
    });
  });

  //fiatTransaction
  describe('fiatTransaction', () => {
    it('should make a fiat transfer', async () => {
      //act
      await transactionsService.fiatTransactions(transactionDto, req, res);
      //assert
      expect(transactionsService.fiatTransactions).toBeDefined();
      expect(transactionsService.fiatTransactions).toHaveBeenCalled();
    });
  });

  //fiatTransaction(exception)
  describe('fiatTransaction(exception)', () => {
    it('should throw an exception in fiat transaction', () => {
      //arrange
      jest
        .spyOn(transactionsService, 'fiatTransactions')
        .mockRejectedValueOnce(new Error());
      //assert
      expect(
        transactionsService.fiatTransactions(transactionDto, req, res),
      ).rejects.toThrowError();
    });
  });
});
