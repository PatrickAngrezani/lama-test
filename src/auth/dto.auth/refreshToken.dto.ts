import {VerifyTokenDto} from './../../auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class refreshTokenDto extends VerifyTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  oldToken: string;
}