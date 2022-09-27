import {UserEntity} from 'src/user/entities/user.entity';
import {Injectable, Body} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DataSource} from 'typeorm';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>
  ) {}

  //findAll
  findAll() {
    return this.repository.find();
  }

  //findOne
  async findOne(User: string): Promise<UserEntity> {
    return this.repository.findOne({where: {User}});
  }

  //create
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  //update
  async update(Id: string, updatedUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repository.findOne({where: {Id}});
    return this.repository.save({
      ...user,
      ...updatedUserDto,
    });
  }

  //removeAll
  async removeAll() {
    const users = await this.findAll();
    return this.repository.remove(users);
  }

  //removeOne
  async remove(Id: string) {
    const user = await this.repository.findOne({where: {Id}});
    return this.repository.remove(user);
  }
}
