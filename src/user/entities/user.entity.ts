import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity} from 'typeorm';
import * as speakeasy from 'speakeasy';

let secret = speakeasy.generateSecret();
let token = secret.base32;
let qrcode = secret.otpauth_url;

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated-at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty()
  @Column({
    name: 'user',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  user: string;

  @ApiProperty()
  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;

  @ApiProperty()
  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: false,
  })
  phone: string;

  @ApiProperty()
  @Column({
    name: 'token',
    type: 'varchar',
    nullable: false,
  })
  token = token;

  @ApiProperty()
  @Column({
    name: 'qrcode',
    type: 'varchar',
    nullable: false,
  })
  qrcode = qrcode;

  contructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.updatedAt = user.updatedAt;
    this.user = user.user;
    this.email = user.email;
    this.phone = user.phone;
  }
}
