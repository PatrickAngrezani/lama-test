import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm';
import * as speakeasy from 'speakeasy';
import { verify } from 'crypto';

const secretCode = speakeasy.generateSecret();
const qrcode = secretCode.base32

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty()
  @Column({
    name: 'User',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  User: string;

  @ApiProperty()
  @Column({
    name: 'Email',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  Email: string;

  @ApiProperty()
  @Column({
    name: 'Phone',
    type: 'varchar',
    nullable: false,
  })
  Phone: string;

  @ApiProperty()
  @Column({
    name: 'QRCode',
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  QRCode = qrcode;

  contructor(user: Partial<UserEntity>) {
    this.Id = user.Id;
    this.User = user.User;
    this.Email = user.Email;
    this.Phone = user.Phone;
  }
}
