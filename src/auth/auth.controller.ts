import { refreshTokenDto } from './dto.auth/refreshToken.dto';
import {VerifyTokenDto} from './../auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {loginDto} from './dto.auth/login.dto';
import {AuthService} from 'src/auth/auth.service';
import {Controller, Request, Post, UseGuards, Body, Patch} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {badRequestSwagger} from 'src/user/swagger.user/error/bad-request.swagger';
import {internalError} from 'src/user/swagger.user/error/internal-error.swagger';

@Controller('users')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  //accessTokenJWT
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
    status: 200,
    description: 'AccessToken obtained succesfully',
    isArray: true,
  })
  @ApiOperation({summary: 'Obtain AccessToken'})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginJwt(@Body() loginDto: loginDto, @Request() req) {
    return this.AuthService.loginJwt(req.user, loginDto, req);
  }

  //refreshToken
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
    status: 200,
    description: 'AccessToken refreshed succesfully',
    isArray: true,
  })
  @ApiOperation({summary: 'Refresh AccessToken'})
  @Patch('login/refresh')
  async refreshToken(
    @Body() refreshTokenDto: refreshTokenDto,
    @Request() req,
  ) {
    return this.AuthService.refreshToken(refreshTokenDto, req);
  }
}
