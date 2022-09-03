import { UserService } from 'src/user/user.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(Email: string, Password: string): Promise<any> {
    const user = await this.userService.findOne(Email);
    if (user && user.Password === Password) {
      const {Password, ...result} = user;
      return result;
    } 
    return null;
  }





}