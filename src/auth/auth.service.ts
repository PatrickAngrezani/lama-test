import { refreshTokenDto } from './dto.auth/refreshToken.dto';
import { loginDto } from './dto.auth/login.dto';
import {VerifyTokenDto} from 'src/auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {UserService} from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import {Injectable, Request, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {DataSource} from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private UserService: UserService,
    private JwtService: JwtService,
    private DataSource: DataSource
  ) {}

  //login(user/password)
  async validateUser(User: string, Password: string, @Request() req) {
    const user = await this.UserService.findOne(User);
    if (user) {
      if (user && bcrypt.compareSync(Password, user.Password)) {
        user.Logged = true;
        const {Password, ...succesfully} = user;
        await this.repository.save(user);
        return succesfully;
      }
      user.Logged = false;
      await this.repository.save(user);
      throw new UnauthorizedException('Incorrect password');
    }
    throw new UnauthorizedException('Incorrect user');
  }

  //accessTokenJWT
  async loginJwt(user: UserEntity, loginDto: loginDto, @Request() req) {
    const payload = {user: user.User, sub: user.Id};
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });

    if (user.Logged === true && tokenVerified) {
      const accessToken = this.JwtService.sign(payload);
      user.AccessToken = accessToken
      await this.repository.update(user.Id, {AccessToken: user.AccessToken})
      return {accessToken}
    }
    throw new UnauthorizedException('token not verified');
  }

  //refreshToken
  async refreshToken(refreshTokenDto: refreshTokenDto, @Request() req) {
    let userAccessToken = await this.DataSource.getRepository(UserEntity).findOneBy({AccessToken: req.body.oldToken})
    if (userAccessToken) {
      let user = await this.DataSource.getRepository(UserEntity).findOneBy({AccessToken: req.body.oldToken})
      const payload = {user: user.User, sub: user.Id};
      const accessToken = this.JwtService.sign(payload)
      user.AccessToken = accessToken
      await this.repository.update(user.Id, {AccessToken: user.AccessToken})
      return {accessToken}
    }
    throw new UnauthorizedException('Invalid Token');
  }
}