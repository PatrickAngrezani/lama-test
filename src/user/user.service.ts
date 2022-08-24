import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  //create
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  //findAll
  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  //findOne
  findOne(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  // //update
  async update(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.repository.findOne({
      where: { id },
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
