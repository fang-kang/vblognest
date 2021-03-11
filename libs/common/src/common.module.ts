/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@common/common/strategy/local.strategy';
import { JwtStrategy } from '@common/common/strategy/jwt.strategy';
import config from './config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: config.TOKEN.secret,
          signOptions: { expiresIn: config.TOKEN.expiresIn }, // token有效期24小时
        };
      },
    }),
  ],
  providers: [CommonService, LocalStrategy, JwtStrategy],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
