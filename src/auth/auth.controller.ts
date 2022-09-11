import { AuthService } from 'src/auth/auth.service';
import { Controller, Request, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Login')
export class AuthController {
  constructor (private AuthService: AuthService) {}
  //login
  @UseGuards(AuthGuard('local'))
  @ApiOperation({summary: 'Login'})
  @Post('login')
  async login(@Request() req) {
    return this.AuthService.login(req.user)
  }
}