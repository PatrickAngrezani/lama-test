import {addPasswordDto} from './dto.auth2fa.ts/addPassword.dto';
import {VerifyTokenDto} from './dto.auth2fa.ts/verifyToken.dto';
import {UserEntity} from 'src/user/entities/user.entity';
import {Request, Response, Body, Injectable} from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class Auth2faService {
  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>,
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
    User: string,
    verifyTokenDto: VerifyTokenDto,
    @Response() res,
    @Request() req,
  ) {
    let user = await this.repository.findOne({where: {User}});
    let tokenVerified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    });
    if (tokenVerified) {
      res.send((user.Verified = true));
      return this.repository.save(user);
    } else {
      res.send([user.Verified = false, user.Logged = false]);
      return this.repository.save(user)
    }
  }

  //addPassword
  async addPassword(
    Id: string,
    @Body() addPasswordDto: addPasswordDto,
    @Response() res,
    @Request() req,
  ) {
    let user = await this.repository.findOne({where: {Id}});
    let newPassword = user.Password
    let newPasswordHash;
    if (!user) {
      res.send('invalid user')
    } else {
      if (user.Verified = true) {
        newPassword = req.body.Password;
        res.send((user.Password = newPasswordHash = bcrypt.hashSync(newPassword, 8)));
        return this.repository.save(user);
      } else {
        res.send('User not verified');
      }
    }
  }
}
