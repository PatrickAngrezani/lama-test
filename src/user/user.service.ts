import {addPasswordDto} from './dto.user/addpassword.dto';
import {Injectable, Body} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';
import {UserEntity} from './entities/user.entity';
import * as speakeasy from 'speakeasy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}

  //addPassword
  async addPassword(Id: string, addPasswordDto: addPasswordDto) {
    const verifiedUser = await this.findOne(Id);
    return this.repository.save({
      ...verifiedUser,
      ...addPasswordDto,
    });
  }

  //verifyToken
  verifyToken() {
    const verified = speakeasy.totp.verify({
      secret: 'HRRHQMJ2I5MDAM3WEM5EIM2TERAUIJJ6LM7UU5JWLJFFAQZUFE3Q', //add user secret
      encoding: 'base32',
      token: '105951', // add user google auth token
    });
    return verified;
  }

  //findAll
  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  //findOne
  async findOne(Email: string): Promise<UserEntity|undefined> {
    return this.repository.findOne({where: {Email}});
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
