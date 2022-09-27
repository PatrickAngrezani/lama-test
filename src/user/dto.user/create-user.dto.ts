import { UsePipes } from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Validate} from 'class-validator';
import { Unique} from 'typeorm';

@UsePipes()
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(Unique)
  User: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Validate(Unique)
  Email: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  Phone: string
}
