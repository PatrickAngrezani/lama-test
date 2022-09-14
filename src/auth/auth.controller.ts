import { AuthService } from 'src/auth/auth.service';
import {UserEntity} from 'src/user/entities/user.entity';
import {Controller, Response, Request, Post, UseGuards, Param} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import * as speakeasy from 'speakeasy';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Controller('users')
@ApiTags('Login')
export class AuthController {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private readonly AuthService: AuthService
  ) {}

  //login
  @UseGuards(AuthGuard('local'))
  @ApiOperation({summary: 'User login'})
  @Post('login/:Id')
  async login(@Param('Id') Id: string, @Response() res, @Request() req) {
    req.user;
    let User = await this.repository.findOne({where: {Id}});
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
    });
    if (req.user && tokenVerified) {
      res.send((User.Logged = true));
      return this.repository.save(User);
    }
    res.send((User.Logged = false));
    return this.repository.save(User);
  }

  //loginJWT
  @UseGuards(AuthGuard('local'))
  @Post('loginjwt/:Id')
  async loginJwt(@Param('Id') Id: string, @Request() req) {
    return await this.AuthService.loginJwt(req.user)
  }
}
