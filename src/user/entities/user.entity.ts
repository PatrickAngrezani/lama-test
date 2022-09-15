import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, Entity, JoinColumn, OneToOne} from 'typeorm';
import * as speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret();
let randomValue = Math.floor(Math.random() * (1000000 - 1) + 1)
let cryptoWallet = randomValue.toFixed(2) 

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty()
  @Column({
    name: 'User',
    type: 'varchar',
    unique: true,
    length: 50,
  })
  User: string;

  @ApiProperty()
  @Column({
    name: 'Email',
    type: 'varchar',
    unique: true,
    length: 100,
  })
  Email: string;

  @ApiProperty()
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
  QrCode ?= secret.otpauth_url;

  @ApiProperty()
  @Column({
    name: 'Verified',
    type: 'boolean',
    nullable: false,
  })
  Verified = false;

  @ApiProperty()
  @Column({
    name: 'Logged',
    type: 'boolean',
    nullable: false,
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
    name: 'Crypto Wallet',
    type: 'numeric',
    nullable: false
  })
  CryptoWallet = cryptoWallet;

  constructor(user?: Partial<UserEntity>) {
    this.Id = user?.Id;
    this.User = user?.User;
    this.Email = user?.Email;
    this.Phone = user?.Phone;
    this.Password = user?.Password;
  }
}
