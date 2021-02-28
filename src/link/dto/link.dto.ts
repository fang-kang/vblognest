/* eslint-disable prettier/prettier */
/**
 * Author：fk
 * Email：1793980864@qq.com
 * CreateTime: 2021/2/27 12:07
 * Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class LinkCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  siteName: string;
  @ApiProperty()
  @IsNotEmpty({
    message: '链接不能为空',
  })
  siteUrl: string;
  @ApiProperty()
  siteHead: string;
  @ApiProperty()
  siteInfo: string;
}
export class LinkListDto {
  @ApiProperty({
    example: 1
  })
  currentPage: number;
  @ApiProperty({
    example: 10
  })
  limit: number;
}
export class LinkEditDto extends LinkCreateDto{
  @ApiProperty()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}
export class LinkDelDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}