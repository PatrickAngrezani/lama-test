import {BalancesService} from './balances.service';
import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';

@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}

  //obtainBalances
  @UseGuards(JwtAuthGuard)
  @Post()
  async obtainBalances(@Request() req, AccessToken: string) {
    return this.BalancesService.obtainBalances(req, AccessToken);
  }
}