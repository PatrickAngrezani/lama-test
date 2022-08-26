import {ApiProperty} from '@nestjs/swagger';
import {Column, PrimaryGeneratedColumn, UpdateDateColumn, Entity} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
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
    nullable: true,
  })
  phone: string;

  contructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.updatedAt = user.updatedAt;
    this.user = user.user;
    this.email = user.email;
    this.phone = user.phone;
  }
}
