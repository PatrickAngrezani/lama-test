import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm';
import * as speakeasy from 'speakeasy';


const secretCode = speakeasy.generateSecret();
const qrcode = secretCode.base32

@Entity()
export class UserEntity {
  verifyToken() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ApiProperty()
  @Column({
    name: 'User',
    type: 'varchar',
    unique: true,
    nullable: true,
    length: 50,
  })
  User: string;

  @ApiProperty()
  @Column({
    name: 'Email',
    type: 'varchar',
    unique: true,
    nullable: true,
    length: 100,
  })
  Email: string;

  @ApiProperty()
  @Column({
    name: 'Phone',
    type: 'varchar',
    nullable: true,
  })
  Phone: string;

  constructor(user?: Partial<UserEntity>) {
    this.Id = user?.Id;
    this.User = user?.User;
    this.Email = user?.Email;
    this.Phone = user?.Phone;
  }
}
