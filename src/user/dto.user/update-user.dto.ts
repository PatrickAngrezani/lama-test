import { UsePipes } from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Validate} from 'class-validator';
import {Unique} from 'typeorm';

@UsePipes()
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
