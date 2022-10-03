import {Auth2faService} from './auth2fa.service';
import {UserModule} from './../../user/user.module';
import {UserEntity} from 'src/user/entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Auth2faController} from './auth2fa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  controllers: [Auth2faController],
  providers: [Auth2faService],
})
export class Auth2faModule {}
