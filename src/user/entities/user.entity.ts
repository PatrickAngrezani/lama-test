import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, Entity, JoinColumn, OneToOne} from 'typeorm';
import * as speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret();

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
    type: 'varchar',
    length: 10,
    default: false,
  })
  Verified: boolean;

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
    name: 'Logged',
    type: 'varchar',
    length: 10,
    nullable: true,
    default: false,
  })
  Logged: boolean;

  constructor(user?: Partial<UserEntity>) {
    this.Id = user?.Id;
    this.User = user?.User;
    this.Email = user?.Email;
    this.Phone = user?.Phone;
    this.Password = user?.Password;
  }
}
