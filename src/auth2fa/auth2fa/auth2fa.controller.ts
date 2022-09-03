import {Auth2faService} from './auth2fa.service';
import {Controller, Request, Param, Post, Response} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import * as speakeasy from 'speakeasy'


@Controller('auth2fa')
@ApiTags('2FA Auth')
export class Auth2faController {
  constructor(private readonly auth2faService: Auth2faService) {}

  //generateSecret
  @ApiOperation({summary: 'Generate Secret'})
  @Post('secret')
  async generateSecret(@Response() res) {
   return res.send({secret: this.auth2faService.secret.base32});
  }

  //generateToken
  @ApiOperation({summary: 'Generate Token'})
  @Post('token')
  async generateToken(@Param('secret') secret: string, @Response() res, @Request() req) {
    return res.send({
        "token": speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date(). getTime() / 1000.0 % 30)))
    })
  }
}
