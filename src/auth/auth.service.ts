import {JwtService} from '@nestjs/jwt';
import {UserService} from 'src/user/user.service';
import {Injectable, Response} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private usersService: UserService,
    private JwtService: JwtService,
  ) {}

  //validateLogin(1step)(user/password)
  async validateUser(User: string, Password: string): Promise<UserEntity | any> {
    const user = await this.usersService.findOne(User);
    if (user && bcrypt.compareSync(Password, user.Password)) {
      user.Logged = true;
      const {Password, ...succesfully} = user;
      this.repository.save(user);
      return succesfully;
    }
    user.Logged = false;
    const {...failed} = user;
    this.repository.save(user);
    return failed;
  }

  //loginJWT
  async loginJwt(user) {
    const payload = {user: user.User, sub: user.Id};
    return ({
      access_token: this.JwtService.sign(payload),
    });
  }
}
