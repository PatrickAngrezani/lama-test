import {Request, Response} from '@nestjs/common';
import {TransactionDto} from './dto.transactions/transaction.dto';
import {TransactionsService} from './transactions.service';
import {Test, TestingModule} from '@nestjs/testing';
import {TransactionsController} from './transactions.controller';
import {UserEntity} from 'src/user/entities/user.entity';

const transactionDto = new TransactionDto();
const userEntify = new UserEntity();
const req = Request();
const res = Response();

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: {
            cryptoTransactions: jest.fn().mockReturnValue(userEntify),
            fiatTransactions: jest.fn().mockResolvedValue(userEntify),
          },
        },
      ],
    }).compile();

    transactionsController = module.get<TransactionsController>(TransactionsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  //define
  it('should be defined', () => {
    expect(transactionsController).toBeDefined();
    expect(transactionsService).toBeDefined();
  });

  //cryptoTransaction
  describe('cryptoTransaction', () => {
    it('should make a crypto transaction', async () => {
      //act
      await transactionsController.cryptoTransactions(transactionDto, req, res);
      //assert
      expect(transactionsService.cryptoTransactions).toBeDefined();
      expect(transactionsService.cryptoTransactions).toHaveBeenCalledTimes(1);
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
        transactionsController.cryptoTransactions(transactionDto, req, res),
      ).rejects.toThrowError();
    });
  });

  //fiatTransaction
  describe('fiatTransaction', () => {
    it('should make a fiat transaction', async () => {
      //act
      const fiatTransaction = await transactionsController.fiatTransactions(
        transactionDto,
        req,
        res,
      );
      //assert
      expect(transactionsService.fiatTransactions).toBeDefined();
      expect(transactionsService.fiatTransactions).toHaveBeenCalledTimes(1);
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
        transactionsController.fiatTransactions(transactionDto, req, res),
      ).rejects.toThrowError();
    });
  });
});
