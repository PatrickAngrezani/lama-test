/* eslint-disable prettier/prettier */
import {ApiProperty} from '@nestjs/swagger';

//404
export class notFoundSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
