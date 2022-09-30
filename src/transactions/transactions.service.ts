import {TransactionDto} from './dto.transactions/transaction.dto';
import {DataSource} from 'typeorm';
import {
  BadRequestException,
  Body,
  HttpStatus,
  Injectable,
  Request,
  Response,
} from '@nestjs/common';
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

    try {
      const fromUser = await this.DataSource.getRepository(UserEntity).findOneBy({
        Id: req.body.fromId,
      });
      const toUser = await this.DataSource.getRepository(UserEntity).findOneBy({
        Id: req.body.toId,
      });
      const quantityTransfered = req.body.quantityTransfered;

      if (fromUser) {
        if (toUser) {
          if (fromUser.Id != toUser.Id) {
            if (fromUser.CryptoBalance < quantityTransfered) {
              res.status(HttpStatus.BAD_REQUEST).send(['User has not sufficient founds']);
              throw new BadRequestException();
            }
            fromUser.CryptoBalance -= quantityTransfered;
            toUser.CryptoBalance += quantityTransfered;

            await this.DataSource.manager.save(fromUser);
            await this.DataSource.manager.save(toUser);

            this.EventEmitter2.emit(
              'Crypto.Transaction',
              'Transaction completed successfully',
            );
            await queryRunner.commitTransaction();

            res.send([fromUser, toUser])
            return {success: true}
          }
          res
            .status(HttpStatus.BAD_REQUEST)
            .send(['Transaction must be made between differents users']);
          throw new BadRequestException();
        }
        throw new BadRequestException();
      }
      throw new BadRequestException();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async fiatTransaction(
    @Body() TransactionDto: TransactionDto,
    @Request() req,
    @Response() res,
  ) {
    const queryRunner = this.DataSource.createQueryRunner();
    const fromUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.fromId,
    });
    const toUser = await this.DataSource.getRepository(UserEntity).findOneBy({
      Id: req.body.toId,
    });
    const quantityTransfered = req.body.quantityTransfered;

    await queryRunner.startTransaction();

    try {
      if (fromUser) {
        if (toUser) {
          if (fromUser.Id != toUser.Id) {
            if (fromUser.FiatBalance < quantityTransfered) {
              res.status(HttpStatus.BAD_REQUEST).send(['User has not sufficient founds']);
              throw new BadRequestException();
            }
            fromUser.FiatBalance -= quantityTransfered;
            toUser.FiatBalance += quantityTransfered;

            await this.DataSource.manager.save(fromUser);
            await this.DataSource.manager.save(toUser);

            this.EventEmitter2.emit(
              'Fiat.Transaction',
              'Transaction completed successfully',
            );
            await queryRunner.commitTransaction();

            res.send([fromUser, toUser])
            return {success: true}
          }
          res
            .status(HttpStatus.BAD_REQUEST)
            .send(['Transaction must be made between differents users']);
          throw new BadRequestException();
        }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
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
