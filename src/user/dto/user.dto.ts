/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserBaseDto {
   @IsNotEmpty({
      message: '用户名不能为空'
   })
   @ApiProperty()
   username: string;

   // @IsNotEmpty({
   //    message: '密码不能为空'
   // })
   @ApiProperty()
   password: string;
}

/**
 * 更新用户信息
 */
export class UserUpdateDto {
   @ApiProperty()
   id: number;
   @ApiProperty()
   nickname: string;
   @ApiProperty()
   avatar: string;
   @ApiProperty()
   signature: string;
   @ApiProperty()
   username: string;

   @ApiProperty()
   password: string;
}
