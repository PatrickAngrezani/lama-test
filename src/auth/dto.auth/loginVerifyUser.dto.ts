import {ApiProperty} from '@nestjs/swagger';

export class LoginVerifyUserDto {
  @ApiProperty()
  User: string;

  @ApiProperty()
  Password: string;

  @ApiProperty()
  secret: string;

  @ApiProperty()
  token: string;
}
