import { loginUserDto } from './dto.auth/login-user.dto';
import { Controller, Request, Post, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Login')
export class AuthController {
  //login
  @UseGuards(AuthGuard('local'))
  @ApiOperation({summary: 'Login'})
  @Post('login')
  async login(@Request() req) {
    return req.user
  }
}