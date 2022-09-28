import {BalancesService} from './balances.service';
import {Controller, Get, Request} from '@nestjs/common';

@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}

  @Get()
  async obtainBalances(User: string, @Request() req) {
    return this.BalancesService.obtainBalances(req.body.User);
  }
}
