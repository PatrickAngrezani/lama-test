/* eslint-disable prettier/prettier */
import {ApiProperty} from '@nestjs/swagger';

//400
export class badRequestSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}
