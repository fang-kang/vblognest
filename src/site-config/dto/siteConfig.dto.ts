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
	
	@ApiProperty()
	avatar:string;
	
	@ApiProperty()
	name:string;
	
	@ApiProperty()
	logo:string;
	
	@ApiProperty()
	ext1:string;
	
	@ApiProperty()
	ext2:string;
	
	@ApiProperty()
	ext3:string;
}
export class ConfigEditDto extends ConfigBaseDto {
    @ApiProperty()
    id: number;
}