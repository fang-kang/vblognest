/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class TagBaseDto {
  @IsNotEmpty({
    message: '标签名不能为空'
  })
  @ApiProperty()
  tagname: string;
}
