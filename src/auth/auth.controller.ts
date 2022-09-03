import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @ApiOperation({summary: 'Auth User'})
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}