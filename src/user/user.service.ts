import { addPasswordDto } from './dto/addpassword.dto';
import {Injectable, Body} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserEntity} from './entities/user.entity';
import * as speakeasy from 'speakeasy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}
  
  //addPassword
  async addPassword(Id: string, addPasswordDto: addPasswordDto) {
    const verifiedUser = await this.findOne(Id)
    if (verifiedUser) {
      return this.repository.save({
        ...verifiedUser,
        ...addPasswordDto
      })
    }
  }

  //verifyToken
  verifyToken() {
    const verified = speakeasy.totp.verify({
      secret: 'LJFGMY2BNR6XE53YKAWHCPRFG5KTOMJGHRNFE2LELJVW2VCWOMRQ',
      encoding: 'base32',
      token: '099564',
    });
    return verified;
  }
  
  //findAll
  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  //findOne
  findOne(Id: string): Promise<UserEntity> {
    return this.repository.findOne({where: {Id}});
  }

  //create
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const User = this.repository.create(createUserDto);
    return this.repository.save(User);
  }

  // //update
  async update(Id: string, updatedUserDto: UpdateUserDto): Promise<UserEntity> {
    const updatedUser = await this.repository.findOne({
      where: {Id},
    });
    return this.repository.save({
      ...updatedUser,
      ...updatedUserDto,
    });
  }

  //removeAll
  async removeAll() {
    const users = await this.findAll();
    return this.repository.remove(users);
  }

  //removeOne
  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
