import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {VerifyTokenDto} from './../../auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
export class loginDto extends VerifyTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  User: string;

  @ApiProperty()
  @IsNotEmpty()
  Password: string;
}
