import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity} from 'typeorm';
import * as speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret();
const token = secret.base32;
const qrcode = secret.base32;

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @UpdateDateColumn({
    name: 'Updated-at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

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
    name: 'Token',
    type: 'varchar',
    nullable: false,
  })
  Token = token;

  @ApiProperty()
  @Column({
    name: 'QRcode',
    type: 'varchar',
    nullable: false,
  })
  QRcode = qrcode;

  contructor(user: Partial<UserEntity>) {
    this.Id = user.Id;
    this.UpdatedAt = user.UpdatedAt;
    this.User = user.User;
    this.Email = user.Email;
    this.Phone = user.Phone;
    this.Token = user.Token;
    this.QRcode = user.QRcode;
  }
}
