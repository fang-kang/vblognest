/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

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
