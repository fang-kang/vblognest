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
export class TagListDto {
  @ApiProperty({
    example: 1
  })
  currentPage: number;
  @ApiProperty({
    example: 10
  })
  limit: number
}
export class TagEditDto extends TagBaseDto {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @ApiProperty()
  id: number;
}
export class TagDelDto {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @ApiProperty()
  id: number;
}