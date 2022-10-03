/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {UserService} from 'src/user/user.service';
import {VerifyTokenDto} from 'src/auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {addPasswordDto} from './dto.auth2fa.ts/addPassword.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {Request, Response, Body, Injectable, UnauthorizedException} from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class Auth2faService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
    private UserService: UserService,
  ) {}

  //generateQRCode
  async generateQRCode(Id: string, @Response() res) {
    const user = await this.repository.findOne({where: {Id}});
    const secret = user.QrCode;
    QRCode.toDataURL(secret, (err, data_url) => {
      res.send(`<img src=${data_url}>
        ${secret}`);
    });
  }

  //verifyToken
  async verifyToken(
    Id: string,
    verifyTokenDto: VerifyTokenDto,
    @Response() res,
    @Request() req,
  ) {
    const user = await this.repository.findOne({where: {Id}});
    const tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });
    if (tokenVerified) {
      res.send((user.Verified = true));
      return this.repository.save(user);
    } else {
      res.send([(user.Verified = false), (user.Logged = false)]);
      return this.repository.save(user);
    }
  }

  //addPassword
  async addPassword(
    User: string,
    @Body() addPasswordDto: addPasswordDto,
    @Response() res,
    @Request() req,
  ) {
    const user = await this.UserService.findOne(User);
    let newPassword;
    let newPasswordHash;
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else {
      if (user.Verified === true) {
        newPassword = req.body.Password;
        res.send([(user.Password = newPasswordHash = bcrypt.hashSync(newPassword, 8))]);
        return this.repository.save(user);
      } else {
        throw new UnauthorizedException('User must be verified to configure Password');
      }
    }
  }
}
