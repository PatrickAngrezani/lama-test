import {Auth2faService} from './../auth2fa/auth2fa/auth2fa.service';
import {Injectable, Body, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private readonly Auth2faService: Auth2faService,
    private DataSource: DataSource,
  ) {}

  //findAll
  findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  //findOne
  async findOne(User: string): Promise<UserEntity> {
    return this.repository.findOne({where: {User}});
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

  //transferFound
  async makeTransfer(Id: string) {
    const queryRunner = this.DataSource.createQueryRunner();
    const user: any = await this.findOne(Id)
    const fromWallet = user.CryptoWallet
    const toWallet = user.CryptoWallet

    if (fromWallet && toWallet) {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
        await queryRunner.manager.update(user, Id, {
          ...user,
            fromWallet,
            toWallet
        })
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    }
    
  }
}
