import {UserModule} from './../user/user.module';
import {TransactionsService} from './transactions.service';
import {TransactionsController} from './transactions.controller';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
