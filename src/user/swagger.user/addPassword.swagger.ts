import {verify} from 'crypto';
/* eslint-disable prettier/prettier */
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Matches} from 'class-validator';
import {UserEntity} from '../entities/user.entity';

export class addPasswordSwagger extends UserEntity {
  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
