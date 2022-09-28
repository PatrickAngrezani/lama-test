import {TransactionDto} from './dto.transactions/transaction.dto';
import {DataSource} from 'typeorm';
import {Body, Injectable, Request} from '@nestjs/common';
import {UserEntity} from 'src/user/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(private DataSource: DataSource) {}

  async cryptoTransactions(@Body() TransactionDto: TransactionDto, @Request() req) {
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
          fromUser.CryptoBalance -= quantityTransfered;
          toUser.CryptoBalance += quantityTransfered;

          await this.DataSource.manager.save(fromUser);
          await this.DataSource.manager.save(toUser);

          const transactionSuccesfully = [fromUser, toUser];

          await queryRunner.commitTransaction();

          return transactionSuccesfully;
        }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async fiatTransaction(@Body() TransactionDto: TransactionDto, @Request() req) {
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
          fromUser.FiatBalance -= quantityTransfered;
          toUser.FiatBalance += quantityTransfered;

          await this.DataSource.manager.save(fromUser);
          await this.DataSource.manager.save(toUser);

          const transactionSuccesfully = [fromUser, toUser];

          await queryRunner.commitTransaction();

          return transactionSuccesfully;
        }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
