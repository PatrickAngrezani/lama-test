/* eslint-disable @typescript-eslint/no-unused-vars */
import {balancesDto} from './dto.balances/balances.dto';
import {UserEntity} from './../user/entities/user.entity';
import {Injectable, Request, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DataSource} from 'typeorm';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private DataSource: DataSource,
  ) {}

  //obtainBalances
  async obtainBalances(@Request() req, balancesDto: balancesDto) {
    const user = await this.DataSource.getRepository(UserEntity).findOneBy({
      AccessToken: req.body.AccessToken,
    });
    if (user.CryptoBalance === null && user.FiatBalance === null) {
      user.CryptoBalance = Number((Math.random() * 1000).toFixed(2));
      user.FiatBalance = Number((Math.random() * 1000).toFixed(2));
      return this.repository.save(user);
    }
    throw new BadRequestException('User already has balances');
  }
}
