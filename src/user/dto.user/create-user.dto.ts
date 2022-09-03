import {ApiProperty} from '@nestjs/swagger';
import { hashSync } from 'bcrypt';
import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Validate} from 'class-validator';
import {BeforeInsert, Unique} from 'typeorm';
import * as speakeasy from 'speakeasy';

const secretCode = speakeasy.generateSecret();
const qrcode = secretCode.base32

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
  Phone: string;

  QRCode = qrcode;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
