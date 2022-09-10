import {ApiProperty} from '@nestjs/swagger';
import { hash } from 'bcrypt';
import {IsEmail, IsNotEmpty, Validate} from 'class-validator';
import {Unique} from 'typeorm';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique)
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
