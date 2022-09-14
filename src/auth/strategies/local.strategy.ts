import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException, Response} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "User",
      passwordField: "Password"
    });
  }

  //validate
  async validate(User: string, Password: string): Promise<any> {
    const user = await this.authService.validateUser(User, Password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
