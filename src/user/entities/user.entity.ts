import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, Entity, Unique} from 'typeorm';
import * as speakeasy from 'speakeasy';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Validate } from 'class-validator';
import { UsePipes } from '@nestjs/common';

const secret = speakeasy.generateSecret();

@UsePipes()
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(Unique)
  @Column({
    name: 'User',
    type: 'varchar',
    unique: true,
    length: 50,
  })
  User: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(Unique)
  @IsEmail()
  @Column({
    name: 'Email',
    type: 'varchar',
    unique: true,
    length: 100,
  })
  Email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @Column({
    name: 'Phone',
    type: 'varchar',
    length: 20,
  })
  Phone: string;

  @ApiProperty()
  @Column({
    name: 'QRCode',
    type: 'varchar',
    length: 500,
  })
  QrCode = secret.otpauth_url

  @ApiProperty()
  @Column({
    name: 'Verified',
    type: 'boolean',
  })
  Verified = false;

  @ApiProperty()
  @Column({
    name: 'Logged',
    type: 'boolean',
  })
  Logged = false;

  @ApiProperty()
  @Column({
    name: 'Password',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  Password: string;

  @ApiProperty()
  @Column({
    name: 'AccessToken',
    type: 'varchar',
    nullable: true,
  })
  AccessToken = null;

  @ApiProperty()
  @Column({
    name: 'Crypto Wallet',
    type: 'real',
    nullable: true
  })
  CryptoBalance: number =  null

  @ApiProperty()
  @Column({
    name: 'Fiat Wallet',
    type: 'real',
    nullable: true
  })
  FiatBalance: number = null

  constructor(user?: Partial<UserEntity>) {
    this.Id = user?.Id;
    this.User = user?.User;
    this.Email = user?.Email;
    this.Phone = user?.Phone;
    this.Password = user?.Password;
  }
}
