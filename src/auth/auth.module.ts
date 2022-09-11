import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'}
        }),
    ],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
    exports: [JwtModule, AuthService]
})
export class AuthModule {}
