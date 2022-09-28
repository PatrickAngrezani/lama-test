import { UserEntity } from './../user/entities/user.entity';
import {UserService} from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BalancesService {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private readonly UserService: UserService) {}

  async obtainBalances(User: string) {
    const user = await this.UserService.findOne(User);
    if (user.CryptoBalance === null && user.FiatBalance === null) {
        user.CryptoBalance = Number((Math.random()*1000).toFixed(2));
        user.FiatBalance = Number((Math.random()*1000).toFixed(2));
        return this.repository.save(user)
    }
    throw new UnauthorizedException('User already has balances')
  }
}
