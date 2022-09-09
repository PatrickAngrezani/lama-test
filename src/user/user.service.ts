import { Auth2faService } from './../auth2fa/auth2fa/auth2fa.service';
import {Injectable, Body} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';
import {UserEntity} from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>, private readonly Auth2faService: Auth2faService) {}

  //findAll
  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  //findOne
  async findOne(Email: string): Promise<UserEntity> {
    return this.repository.findOne({where: {Email}});
  }


  //create
  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  //update
  async update(Id: string, updatedUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repository.findOne({where: {Id}});
    return this.repository.save({
      ...user,
      ...updatedUserDto
    });
  }

  //addPassword
  async addPassword(Id: string, UpdateUserDto: UpdateUserDto): Promise<UserEntity>{
    const user = await this.repository.findOne({where: {Id}});
    const verified = await this.Auth2faService.verifyToken
    if (verified) {
      
    } 
    return null
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
