/* eslint-disable prettier/prettier */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@libs/db/entity/user.entity";
import {Repository} from "typeorm";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    console.log(payload,'payload')
    // return { id: payload.id, username: payload.username };
    return await this.userRepository.findOne({
      username: payload.username
  })
  }
}
