/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CategoryBaseDto {
  @IsNotEmpty({
    message: '分类名不能为空'
  })
  @ApiProperty()
  categoryname: string;
}
export class CategoryListDto {
  @ApiProperty({
    example: 1
  })
  currentPage: number;
  @ApiProperty({
    example: 10
  })
  limit: number
}
export class CategoryEditDto extends CategoryBaseDto {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @ApiProperty()
  id: number;
}
export class CategoryDelDto {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  @ApiProperty()
  id: number;
}