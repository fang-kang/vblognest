import { TagBaseDto } from './dto/tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TagInterface } from './interface/tag.interface';
@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post('addTag')
  @HttpCode(200)
  @ApiOperation({
    summary: '添加标签',
  })
  async addTag(@Body() body: TagBaseDto): Promise<TagInterface> {
    return this.tagService.addTag(body);
  }
  @Get('getAll')
  @ApiOperation({
    summary: '查询所有标签',
  })
  async getAll(): Promise<TagInterface[]> {
    return this.tagService.getAll();
  }
  @Get('getListById')
  @ApiOperation({
    summary: '查询所有2标签',
  })
  async getListById(): Promise<any> {
    return this.tagService.getListById();
  }
}
