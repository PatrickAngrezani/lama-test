import {UserService} from 'src/user/user.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  //validateUser
  async validateUser(Email: string, Password: string): Promise<any> {
    const user = await this.userService.findOne(Email);

    return user;
  }
}
