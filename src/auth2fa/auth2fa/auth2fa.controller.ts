import { verifyTokenSwagger } from './swagger.auth2fa/verifyToken.swagger';
import {VerifyTokenDto} from './dto.auth2fa.ts/verifyToken.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {Controller, Request, Param, Post, Response, Get, Body} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtSecretRequestType} from '@nestjs/jwt';
import { internalError } from 'src/user/swagger.user/error/internal-error.swagger';
import { badRequestSwagger } from 'src/user/swagger.user/error/bad-request.swagger';

@Controller('auth2fa')
@ApiTags('2FA Auth')
export class Auth2faController {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}

  //generateQRCode
  @ApiOperation({summary: 'Generate QRCode'})
  @Get('qrcode')
  async generateQRCode(
    @Param('Id')
    Id: string,
    @Response() res,
  ) {
    const user = await this.repository.findOne({where: {Id}});
    const secret = user.QrCode;

    QRCode.toDataURL(secret, (err, data_url) => {
      res.send(`<img src=${data_url}>
       <br> ${secret}`);
    });
  }

  //verifyToken
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Token verified succesfully',
    type: verifyTokenSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Verify Token'})
  @Post('verifytoken')
  async verifyToken(
    @Param('Id') Id: string,
    @Body() verifyTokenDto: VerifyTokenDto,
    @Response() res,
    @Request() req,
  ) {
    const user = await this.repository.findOne({where: {Id}});
    return res.send({
      valid: speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        token: req.body.token,
        window: 0,
      }),
    });
  }
}
