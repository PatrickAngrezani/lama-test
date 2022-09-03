import { Module } from '@nestjs/common';
import { Auth2faController } from './auth2fa.controller';
import { Auth2faService } from './auth2fa.service';

@Module({
  controllers: [Auth2faController],
  providers: [Auth2faService]
})
export class Auth2faModule {}
