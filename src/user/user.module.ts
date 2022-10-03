import {AuthService} from './../auth/auth.service';
import {Auth2faService} from './../auth2fa/auth2fa/auth2fa.service';
import {UserEntity} from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from 'src/auth/constants';
import {JwtStrategy} from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '120s'},
    }),
  ],
  controllers: [UserController],
  providers: [UserService, Auth2faService, AuthService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
