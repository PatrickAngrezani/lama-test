import {UserEntity} from 'src/user/entities/user.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as speakeasy from 'speakeasy';

@Injectable()
export class Auth2faService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}

  secret = speakeasy.generateSecret();

  //getUser
  async getUser(Id: any): Promise<UserEntity> {
    return this.repository.findOne(Id);
  }

  //validTokenUser
  async validTokenUser(Id: string) {
    const user = this.getUser(Id);
  }
}
