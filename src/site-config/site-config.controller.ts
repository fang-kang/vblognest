import { ConfigBaseDto, ConfigEditDto } from './dto/siteConfig.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SiteConfigService } from './site-config.service';
import { Body, Controller, HttpCode, Post, Get } from '@nestjs/common';
import { SiteConfigInterface } from './interface/siteConfig.interface';

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
  @Get('getConfig')
  @ApiOperation({
    summary: '获取公共配置',
  })
  async getConfig(): Promise<SiteConfigInterface[]> {
    return await this.siteService.getConfig();
  }
}
