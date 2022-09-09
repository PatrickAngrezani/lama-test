import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Validate, IsEmail} from 'class-validator';
import {Unique} from 'typeorm';

export class loginUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique)
  User: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
