import {Auth2faService} from './auth2fa.service';
import {verifyTokenSwagger} from './swagger.auth2fa/verifyToken.swagger';
import {VerifyTokenDto} from './dto.auth2fa.ts/verifyToken.dto';
import {Controller, Request, Param, Post, Response, Get, Body} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {internalError} from 'src/user/swagger.user/error/internal-error.swagger';
import {badRequestSwagger} from 'src/user/swagger.user/error/bad-request.swagger';

@Controller('auth2fa')
@ApiTags('2FA Auth')
export class Auth2faController {
  constructor(
    private readonly Auth2faService: Auth2faService
  ) {}

  //generateQRCode
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
    description: 'QRCode generated succesfully',
    type: verifyTokenSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Generate QRCode'})
  @Get('qrcode')
  async generateQRCode(@Param('Id') Id: string, @Response() res) {
    return this.Auth2faService.generateQRCode(Id,res) 
    };
  

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
    Id: string,
    @Body() verifyTokenDto: VerifyTokenDto,
    @Response() res,
    @Request() req,
  ) {
    return this.Auth2faService.verifyToken(Id, verifyTokenDto, res, req);
  }
}
