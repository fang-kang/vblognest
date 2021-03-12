/* eslint-disable prettier/prettier */
import { ConfigBaseDto, ConfigEditDto } from './dto/siteConfig.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SiteConfigService } from './site-config.service';
import { Body, Controller, HttpCode, Post, Get } from '@nestjs/common';
import { SiteConfigInterface } from './interface/siteConfig.interface';
import { CommonIdDto } from './../../libs/common/src/dto/common.dto';
@ApiTags('网站配置')
@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteService: SiteConfigService) {}
  @Post('addConfig')
  @HttpCode(200)
  @ApiOperation({
    summary: '添加网站配置',
  })
  async addConfig(@Body() body: ConfigBaseDto): Promise<any> {
    return await this.siteService.addConfig(body);
  }
  @Post('editConfig')
  @HttpCode(200)
  @ApiOperation({
    summary: '编辑网站配置',
  })
  async editConfig(@Body() body: ConfigEditDto): Promise<any> {
    return await this.siteService.editConfig(body);
  }
  @Post('delConfig')
  @HttpCode(200)
  @ApiOperation({
    summary: '删除网站配置',
  })
  async delConfig(@Body() p: CommonIdDto): Promise<any> {
    return await this.siteService.delConfig(p);
  }
  @Get('getConfig')
  @ApiOperation({
    summary: '获取公共配置',
  })
  async getConfig(): Promise<SiteConfigInterface> {
    return await this.siteService.getConfig();
  }
}
