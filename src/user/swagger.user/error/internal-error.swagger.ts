/* eslint-disable prettier/prettier */
import {ApiProperty} from '@nestjs/swagger';

export class internalError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
