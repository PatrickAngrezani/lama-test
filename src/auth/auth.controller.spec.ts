import {refreshTokenDto} from './dto.auth/refreshToken.dto';
import {loginDto} from './dto.auth/login.dto';
import {AuthService} from 'src/auth/auth.service';
import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {UserEntity} from 'src/user/entities/user.entity';
import {Request} from '@nestjs/common';

const userEntify = new UserEntity();
const LoginDto = new loginDto();
const req = Request();
let user: UserEntity;
let RefreshTokenDto: refreshTokenDto;

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginJwt: jest.fn().mockReturnValue(userEntify),
            refreshToken: jest.fn().mockReturnValue(userEntify),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  //describe
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  //loginJwt
  describe('loginJWT', () => {
    it('should makes user receives JWT token', async () => {
      //act
      await authController.loginJwt(LoginDto, req);
      //assert
      expect(authService.loginJwt).toBeDefined();
      expect(authService.loginJwt).toHaveBeenCalled();
    });
  });

  //loginJWT(Error)
  describe('loginJWT(Error)', () => {
    it('should throw an error when user receiving JWT token', async () => {
      //arrange
      jest.spyOn(authService, 'loginJwt').mockRejectedValueOnce(new Error());
      //assert
      expect(authService.loginJwt(user, LoginDto, req)).rejects.toThrowError();
    });
  });

  //refreshToken
  describe('refreshToken', () => {
    it('should refresh users accessToken', async () => {
      //act
      await authController.refreshToken(RefreshTokenDto, req);
      //assert
      expect(authService.refreshToken).toBeDefined();
      expect(authService.refreshToken).toHaveBeenCalled();
    });
  });

  //refreshToken(Error)
  describe('refreshToken(Error)', () => {
    it('should throw an error when refreshing users accessToken', async () => {
      //arrange
      jest.spyOn(authService, 'refreshToken').mockRejectedValueOnce(new Error());
      //assert
      expect(authService.refreshToken(RefreshTokenDto, req)).rejects.toThrowError();
    });
  });
});
