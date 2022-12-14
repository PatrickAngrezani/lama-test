/* eslint-disable @typescript-eslint/no-unused-vars */
import {Auth2faModule} from './auth2fa/auth2fa/auth2fa.module';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {TransactionsModule} from './transactions/transactions.module';
import {BalancesModule} from './balances/balances.module';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {DataSource} from 'typeorm';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        console.log(options);
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    }),
    UserModule,
    AuthModule,
    Auth2faModule,
    TransactionsModule,
    BalancesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
