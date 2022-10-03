import {refreshTokenDto} from './dto.auth/refreshToken.dto';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UserEntity} from 'src/user/entities/user.entity';
import {Request} from '@nestjs/common';
import {loginDto} from './dto.auth/login.dto';

const userEntify = new UserEntity();
const req = Request();
const LoginDto = new loginDto();
let User: string;
let Password: string;
let RefreshTokenDto: refreshTokenDto;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockReturnValue(userEntify),
            loginJwt: jest.fn().mockReturnValue(userEntify),
            refreshToken: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  //define
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  //validateUser
  describe('validateUser', () => {
    it('should validate user', async () => {
      //act
      await authService.validateUser(User, Password, req);
      //assert
      expect(authService.validateUser).toBeDefined();
      expect(authService.validateUser).toHaveBeenCalled();
    });
  });

  //validateUser(error)
  describe('validateUser(error)', () => {
    it('should throw an error when validating user', () => {
      //arrange
      jest.spyOn(authService, 'validateUser').mockRejectedValueOnce(new Error());
      //assert
      expect(authService.validateUser(User, Password, req)).rejects.toThrowError();
    });
  });

  //loginJwt
  describe('loginJwt', () => {
    it('should gives user AccessToken', async () => {
      //act
      await authService.loginJwt(userEntify, LoginDto, req);
      //assert
      expect(authService.loginJwt).toBeDefined();
      expect(authService.loginJwt).toHaveBeenCalled();
    });
  });

  //loginJwt(error)
  describe('loginJwt(error)', () => {
    it('should throw an error when giving user AcessToken', () => {
      //arrange
      jest.spyOn(authService, 'loginJwt').mockRejectedValueOnce(new Error());
      //assert
      expect(authService.loginJwt(userEntify, LoginDto, req)).rejects.toThrowError();
    });
  });

  //refreshToken
  describe('refreshToken', () => {
    it('should refreshes user AccessToken', async () => {
      //act
      await authService.refreshToken(RefreshTokenDto, req);
      //assert
      expect(authService.refreshToken).toBeDefined();
      expect(authService.refreshToken).toHaveBeenCalled();
    });
  });

  //refreshToken(error)
  describe('refreshToken(error)', () => {
    it('should throw an error when refreshing user AcessToken', () => {
      //arrange
      jest.spyOn(authService, 'refreshToken').mockRejectedValueOnce(new Error());
      //assert
      expect(authService.refreshToken(RefreshTokenDto, req)).rejects.toThrowError();
    });
  });
});
