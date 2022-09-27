import {VerifyTokenDto} from 'src/auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {UserService} from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import {Injectable, Request, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  //login(user/password)
  async validateUser(User: string, Password: string, @Request() req) {
    const user = await this.UserService.findOne(User);
    if (user) {
      if (user && bcrypt.compareSync(Password, user.Password)) {
        user.Logged = true;
        const {Password, ...succesfully} = user;
        this.repository.save(user);
        return succesfully;
      }
      user.Logged = false;
      this.repository.save(user);
      throw new UnauthorizedException('Incorrect password');
    }
    throw new UnauthorizedException('Incorrect user');
  }

  //loginJWT
  async loginJwt(user: UserEntity, VerifyTokenDto: VerifyTokenDto, @Request() req) {
    const payload = {user: user.User, sub: user.Id};
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });
    if (user.Logged === true && tokenVerified) {
      return {
        access_token: this.JwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('token not verified');
  }
}
