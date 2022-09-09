import {verifiedUserDto} from './../../user/dto.user/verifiedUser.dto';
import {UpdateUserDto} from './../../user/dto.user/update-user.dto';
import {VerifyTokenDto} from './dto.auth2fa.ts/verifyToken.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {Request, Response, Body, Injectable} from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class Auth2faService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
  ) {}

  //generateQRCode
  async generateQRCode(Id: any, @Response() res) {
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
    let user = await this.repository.findOne({where: {Id}});
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });
    if (tokenVerified) {
      res.send((user.Verified = true));
      return this.repository.save(user)
    } else {
      res.send('User not verified');
    }
  }
}
