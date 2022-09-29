import {UserEntity} from './../user/entities/user.entity';
import {Injectable, Request, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class BalancesService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>
  ) {}

  async obtainBalances(User: UserEntity, @Request() req) {
    const user = await this.repository.findOneBy({AccessToken: req.header.AccessToken});
    if (user.CryptoBalance === null && user.FiatBalance === null) {
      user.CryptoBalance = Number((Math.random() * 1000).toFixed(2));
      user.FiatBalance = Number((Math.random() * 1000).toFixed(2));
      return this.repository.save(user);
    }
    throw new UnauthorizedException('User already has balances');
  }
}