/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@common/common/strategy/local.strategy';
import { JwtStrategy } from '@common/common/strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: 'secret',
          signOptions: { expiresIn: '86400s' }, // token有效期24小时
        };
      },
    }),
  ],
  providers: [CommonService, LocalStrategy, JwtStrategy],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
