import {TransactionDto} from './dto.transactions/transaction.dto';
import {Connection, DataSource} from 'typeorm';
import {Body, Injectable, Request, Response} from '@nestjs/common';
import {UserEntity} from 'src/user/entities/user.entity';
import {OnEvent} from '@nestjs/event-emitter';
import {EventEmitter2} from '@nestjs/event-emitter';

@Injectable()
export class TransactionsService {
  constructor(private DataSource: DataSource, private EventEmitter2: EventEmitter2) {}

  async cryptoTransactions(
    @Body() TransactionDto: TransactionDto,
    @Request() req,
    @Response() res,
  ) {
    const queryRunner = this.DataSource.createQueryRunner();
    await queryRunner.startTransaction();

    let fromUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.fromId,
    });
    let toUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.toId,
    });
    let quantityTransfered = await req.body.quantityTransfered;

    try {
      if (fromUser.Id != toUser.Id && fromUser.CryptoBalance > quantityTransfered) {
        fromUser.CryptoBalance -= quantityTransfered;
        toUser.CryptoBalance += quantityTransfered;

        await this.DataSource.manager.save(fromUser);
        await this.DataSource.manager.save(toUser);

        this.EventEmitter2.emit(
          'Crypto.Transaction',
          'Transaction completed successfully',
        );

        await queryRunner.commitTransaction();
        res.sendStatus(200);
        return 200;
      }
      throw new Error();
    } catch (Error) {
      await queryRunner.rollbackTransaction();
      res.sendStatus(400);
      return 400;
    } finally {
      await queryRunner.release();
    }
  }

  async fiatTransactions(
    @Body() TransactionDto: TransactionDto,
    @Request() req,
    @Response() res,
  ) {
    const queryRunner = this.DataSource.createQueryRunner();
    await queryRunner.startTransaction();

    const fromUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.fromId,
    });
    const toUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.toId,
    });
    const quantityTransfered = req.body.quantityTransfered;

    try {
      if (fromUser.Id != toUser.Id && fromUser.FiatBalance > quantityTransfered) {
        fromUser.FiatBalance -= quantityTransfered;
        toUser.FiatBalance += quantityTransfered;

        await this.DataSource.manager.save(fromUser);
        await this.DataSource.manager.save(toUser);

        this.EventEmitter2.emit('Fiat.Transaction', 'Transaction completed successfully');
        await queryRunner.commitTransaction();
        res.sendStatus(200);
        return 200;
      }
      throw new Error();
    } catch (Error) {
      await queryRunner.rollbackTransaction();
      res.sendStatus(400);
      return 400;
    } finally {
      await queryRunner.release();
    }
  }

  @OnEvent('Crypto.Transaction')
  checkCryptoTransaction(payload) {
    console.log('CryptoTransaction:', payload);
  }

  @OnEvent('Fiat.Transaction')
  checkFiatTransaction(payload) {
    console.log('FiatTransaction:', payload);
  }
}
