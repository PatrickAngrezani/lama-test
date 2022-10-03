import {addPasswordDto} from './dto.auth2fa.ts/addPassword.dto';
import {VerifyTokenDto} from 'src/auth2fa/auth2fa/dto.auth2fa.ts/verifyToken.dto';
import {Auth2faService} from './auth2fa.service';
import {Test, TestingModule} from '@nestjs/testing';
import {Auth2faController} from './auth2fa.controller';
import {UserEntity} from 'src/user/entities/user.entity';
import {Response, Request} from '@nestjs/common';

const userEntify = new UserEntity();
let Id: string;
let User: string;
const verifyTokenDto = new VerifyTokenDto();
const AddPasswordDto = new addPasswordDto();
const res = Response();
const req = Request();

describe('Auth2faController', () => {
  let auth2faController: Auth2faController;
  let auth2faService: Auth2faService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Auth2faController],
      providers: [
        {
          provide: Auth2faService,
          useValue: {
            generateQRCode: jest.fn().mockReturnValue(userEntify),
            verifyToken: jest.fn().mockReturnValue(userEntify),
            addPassword: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    auth2faController = module.get<Auth2faController>(Auth2faController);
    auth2faService = module.get<Auth2faService>(Auth2faService);
  });

  //define
  it('should be defined', () => {
    expect(auth2faController).toBeDefined();
  });

  //generateQRCode
  describe('generateQRCode', () => {
    it('should generate QRCode', async () => {
      //act
      await auth2faController.generateQRCode(Id, res);
      //assert
      expect(auth2faService.generateQRCode).toBeDefined();
      expect(auth2faService.generateQRCode).toHaveBeenCalled();
    });
  });

  //generateQRCode(error)
  describe('generateQRCode(error)', () => {
    it('should throw an error when user receives QRCode', async () => {
      //arrange
      jest.spyOn(auth2faService, 'generateQRCode').mockRejectedValueOnce(new Error());
      //assert
      expect(auth2faController.generateQRCode(Id, res)).rejects.toThrowError();
    });
  });

  //verifyToken
  describe('verifyToken', () => {
    it('should verify Token', async () => {
      //act
      await auth2faController.verifyToken(Id, verifyTokenDto, res, req);
      //assert
      expect(auth2faService.verifyToken).toBeDefined();
      expect(auth2faService.verifyToken).toHaveBeenCalled();
    });
  });

  //verifyToken(error)
  describe('verifyToken(error)', () => {
    it('should throw an error when user verifies Token', async () => {
      //arrange
      jest.spyOn(auth2faService, 'verifyToken').mockRejectedValueOnce(new Error());
      //assert
      expect(
        auth2faController.verifyToken(Id, verifyTokenDto, res, req),
      ).rejects.toThrowError();
    });
  });

  //addPassword
  describe('addPassword', () => {
    it('should add Password', async () => {
      //act
      await auth2faController.addPassword(User, AddPasswordDto, res, req);
      //assert
      expect(auth2faService.addPassword).toBeDefined();
      expect(auth2faService.addPassword).toHaveBeenCalled();
    });
  });

  //addPassword(error)
  describe('addPassword(error)', () => {
    it('should throw an error when user adds Password', async () => {
      //arrange
      jest.spyOn(auth2faService, 'addPassword').mockRejectedValueOnce(new Error());
      //assert
      expect(
        auth2faController.addPassword(User, AddPasswordDto, res, req),
      ).rejects.toThrowError();
    });
  });
});
