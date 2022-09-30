import {UserEntity} from './../user/entities/user.entity';
import {Injectable, Request, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private DataSource: DataSource
  ) {}

  async obtainBalances(@Request() req, AccessToken: string) {
    const user = await this.DataSource.getRepository(UserEntity).findOneBy({AccessToken: req.body.AccessToken})
    if (user.CryptoBalance === null && user.FiatBalance === null) {
      user.CryptoBalance = Number((Math.random() * 1000).toFixed(2));
      user.FiatBalance = Number((Math.random() * 1000).toFixed(2));
      return this.repository.save(user);
    }
    throw new UnauthorizedException('User already has balances');
  }
}