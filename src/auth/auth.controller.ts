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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.AuthService.loginJwt(req.user);
  }
}
