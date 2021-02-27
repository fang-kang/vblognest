/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:07:19
*/
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@libs/db/entity/user.entity';
import { Repository } from 'typeorm';
import { CustomException } from '@common/common/common/http.decoration';

const md5 = require('md5');

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  /**
   * 执行、验证策略
   */
  async validate(username: string, password: string) {
    const loginPwd = md5(password);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: username,
      })
      .addSelect('user.password')
      .getOne();
    if (!user) {
      throw new CustomException('用户不存在');
    }
    if (loginPwd !== user.password) {
      throw new CustomException('密码不正确');
    }
    delete user.password;
    console.log(user, '-----')
    return user;
  }
}
