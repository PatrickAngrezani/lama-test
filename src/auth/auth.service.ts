import { JwtService } from '@nestjs/jwt';
import {loginUserDto} from './dto.auth/login-user.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {UserService} from 'src/user/user.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(User: string, Password: string): Promise<any> {
    const user = await this.usersService.findOne(User);
    if (user && user.Password == Password) {
      const {Password, ...result} = user;
      return result;
    }
    return null;
  }
 
}
