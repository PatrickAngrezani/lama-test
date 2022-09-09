import {ApiProperty} from '@nestjs/swagger';

export class verifiedUserDto {
  @ApiProperty()
  Verified: boolean;
}
