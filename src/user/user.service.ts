import {
  Injectable,
  Body,
  Response,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository, DataSource, Unique } from 'typeorm';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}

  //getAll
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
  async update(
    @Body() updatedUserDto: UpdateUserDto,
    User: string,
    @Response() res,
    @Request() req,
  ) {
    const user = await this.findOne(User)
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (tokenVerified && updatedUserDto.Email !== user.Email) {
      let passwordUpdated = req.body.Password;
      let emailUpdated = req.body.Email;
      let passwordUpdatedHash;
      user.Email = emailUpdated;
      user.Password = passwordUpdatedHash = bcrypt.hashSync(passwordUpdated, 8);
      res.send([user.Email, user.Password]);
      return this.repository.update(user.Id, {
        Email: user.Email,
        Password: user.Password,
      });
    }
    throw new BadRequestException();
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
