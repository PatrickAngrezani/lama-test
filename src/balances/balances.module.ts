import {jwtConstants} from './../auth/constants';
import {JwtService, JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/user/entities/user.entity';
import {UserModule} from 'src/user/user.module';
import {BalancesController} from './balances.controller';
import {BalancesService} from './balances.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '500s'},
    }),
  ],
  controllers: [BalancesController],
  providers: [BalancesService, JwtService],
})
export class BalancesModule {}
