import { loginUserDto } from '../dto.auth/login-user.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(User: string, Password: string): Promise<any> {
    const user = await this.authService.validateUser(User, Password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
