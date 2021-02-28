/* eslint-disable prettier/prettier */
import { LinkService } from './link.service';
import { Controller, HttpCode, Body, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  LinkCreateDto,
  LinkEditDto,
  LinkDelDto,
  LinkListDto,
} from './dto/link.dto';

@ApiTags('友情链接')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Get('getLink')
  @ApiOperation({
    summary: '获取友情链接',
  })
  async getLink(): Promise<any> {
    const addLink = await this.linkService.getLink();
    return addLink;
  }
  @Post('addLink')
  @ApiOperation({
    summary: '添加友情链接',
  })
  @HttpCode(200)
  async addLink(@Body() params: LinkCreateDto): Promise<any> {
    const addLink = await this.linkService.addLink(params);
    return addLink;
  }
  @Post('editLink')
  @ApiOperation({
    summary: '编辑友情链接',
  })
  @HttpCode(200)
  async editLink(@Body() params: LinkEditDto): Promise<any> {
    const data = await this.linkService.updateLink(params);
    return data;
  }
  @Post('delLink')
  @ApiOperation({
    summary: '删除友情链接',
  })
  @HttpCode(200)
  async delLink(@Body() params: LinkDelDto): Promise<any> {
    const data = await this.linkService.deleteLink(params);
    return data;
  }
  @Post('getLinkList')
  @ApiOperation({
    summary: '获取友情链接列表',
  })
  @HttpCode(200)
  async getLinkList(@Body() params: LinkListDto): Promise<any> {
    const list = await this.linkService.getLinkList(params);
    const total = await this.linkService.getLinkCount();

    const result = {
      list,
      total,
    };

    return result;
  }
}
