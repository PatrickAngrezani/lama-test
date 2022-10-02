import {TransactionsService} from './transactions.service';
import {Body, Controller, Patch, Post, Request, Response} from '@nestjs/common';
import {TransactionDto} from './dto.transactions/transaction.dto';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { badRequestSwagger } from 'src/user/swagger.user/error/bad-request.swagger';
import { internalError } from 'src/user/swagger.user/error/internal-error.swagger';
import { transactionSwagger } from './swagger.transaction/transaction.swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private TransactionsService: TransactionsService,
  ) {}

  //cryptoTransaction
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'CryptoTransaction succesfully made',
    type: transactionSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Crypto Transaction'})
  @Patch('crypto')
  async cryptoTransactions(@Body() TransactionDto: TransactionDto, @Request() req, @Response() res) {
    return this.TransactionsService.cryptoTransactions(TransactionDto, req, res)
  }

  //fiatTransaction
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'FiatTransaction succesfully made',
    type: transactionSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Fiat Transaction'})
  @Patch('fiat')
  async fiatTransactions(@Body() TransactionDto: TransactionDto, @Request() req, @Response() res) {
    return this.TransactionsService.fiatTransactions(TransactionDto, req, res);
  }
}
