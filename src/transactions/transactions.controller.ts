import {TransactionsService} from './transactions.service';
import {Body, Controller, Patch, Post, Request, Response} from '@nestjs/common';
import {TransactionDto} from './dto.transactions/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private TransactionsService: TransactionsService,
  ) {}

  @Patch('crypto')
  async cryptoTransactions(@Body() TransactionDto: TransactionDto, @Request() req, @Response() res) {
    return this.TransactionsService.cryptoTransactions(TransactionDto, req, res);
  }

  @Patch('fiat')
  async fiatTransaction(@Body() TransactionDto: TransactionDto, @Request() req, @Response() res) {
    return this.TransactionsService.fiatTransaction(TransactionDto, req, res);
  }
}
