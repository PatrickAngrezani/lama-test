import {ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginVerifyUserDto {
  @ApiProperty()
  @IsNotEmpty()
  User: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;

  @ApiProperty()
  @IsNotEmpty()
  secret: string;

  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
