/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
export class ConfigBaseDto {
    @IsNotEmpty({
        message: 'ICP备案号不能为空'
    })
    @ApiProperty()
    icp: string;
    @IsNotEmpty({
        message: '公安备案号不能为空'
    })
    @ApiProperty()
    psr: string;
}
export class ConfigEditDto extends ConfigBaseDto {
    @IsNotEmpty({
        message: 'id不能为空'
    })
    @ApiProperty()
    id: number;
}