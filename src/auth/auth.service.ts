import { JwtService } from '@nestjs/jwt';
import {UserService} from 'src/user/user.service';
import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private JwtService: JwtService) {}

    //validateUser(user/password)
  async validateUser(User: string, Password: string): Promise<any> {
    const user = await this.usersService.findOne(User);
    if (user && bcrypt.compareSync(Password, user.Password)) {
      const {Password, ...result} = user;
      return result;
    }
    return null;
  }
 
  //   //loginJWT
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     acess_token: this.JwtService.sign(payload)
  //   }
  // }
}
