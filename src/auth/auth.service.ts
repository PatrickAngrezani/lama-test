import {JwtService} from '@nestjs/jwt';
import {UserService} from 'src/user/user.service';
import {Injectable, Response, UnauthorizedException} from '@nestjs/common';
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

  //login(user/password)
  async validateUser(User: string, Password: string): Promise<UserEntity | any> {
    const user = await this.usersService.findOne(User);
    if (user) {
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
    throw new UnauthorizedException();
  }

  //loginJWT
  async loginJwt(user: UserEntity) {
    const payload = {user: user.User, sub: user.Id};
    if (user.Logged === true) {
      return {
        access_token: this.JwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
