import { LoginVerifyUserDto } from './dto.auth/loginVerifyUser.dto';
import { VerifyTokenDto } from 'src/auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import { AuthService } from 'src/auth/auth.service';
import {Controller, Request, Post, UseGuards, Param, Body} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Login')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() VerifyTokenDto: VerifyTokenDto,@Request() req) {
    return this.AuthService.loginJwt(req.user, VerifyTokenDto, req);
  }
}
