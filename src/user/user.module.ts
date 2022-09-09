import { Auth2faService } from './../auth2fa/auth2fa/auth2fa.service';
import {UserEntity} from './entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, Auth2faService],
  exports: [UserService],
})
export class UserModule {}
