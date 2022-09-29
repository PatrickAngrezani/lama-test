import {BalancesService} from './balances.service';
import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';

@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}

  //obtainBalances
  @UseGuards(JwtAuthGuard)
  @Get()
  async obtainBalances(AccessToken: string, @Request() req) {
    return this.BalancesService.obtainBalances(req.header.AccessToken, req);
  }
}
