/* eslint-disable @typescript-eslint/no-unused-vars */
import {balancesDto} from './dto.balances/balances.dto';
import {BalancesService} from './balances.service';
import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {ApiResponse, ApiOperation, ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {badRequestSwagger} from 'src/user/swagger.user/error/bad-request.swagger';
import {internalError} from 'src/user/swagger.user/error/internal-error.swagger';

@ApiTags('Obtain Balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly BalancesService: BalancesService) {}

  //obtainBalances
  @UseGuards(JwtAuthGuard)
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
    status: 401,
    description: 'Unauthorized',
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Balances obtained succesfully',
    isArray: true,
  })
  @ApiOperation({summary: 'Obtain Balances'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async obtainBalances(@Request() req, @Body() balancesDto: balancesDto) {
    return this.BalancesService.obtainBalances(req, balancesDto);
  }
}
