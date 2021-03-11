/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommonListDto {
  @ApiProperty({
    example: 1,
  })
  currentPage: number;
  @ApiProperty({
    example: 10,
  })
  limit: number;
}

export class CommonIdDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty({message:'id不能为空'})
  id: number;
}
