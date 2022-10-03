/* eslint-disable prettier/prettier */
import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException, Request, Response} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'User',
      passwordField: 'Password',
    });
  }
  
  //validate
  async validate(User: string, Password: string, @Request() req): Promise<any> {
    const user = await this.authService.validateUser(User, Password, req);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
