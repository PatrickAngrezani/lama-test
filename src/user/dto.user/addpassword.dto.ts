import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class addPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
