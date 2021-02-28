/* eslint-disable prettier/prettier */
import { TagBaseDto, TagEditDto ,TagListDto} from './dto/tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { TagInterface } from './interface/tag.interface';
@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }
  @Post('addTag')
  @HttpCode(200)
  @ApiOperation({
    summary: '添加标签',
  })
  async addTag(@Body() body: TagBaseDto): Promise<TagInterface> {
    return await this.tagService.addTag(body);
  }
  @Get('getAll')
  @ApiOperation({
    summary: '查询所有标签',
  })
  async getAll(): Promise<TagInterface[]> {
    return await this.tagService.getAll();
  }
  @Get('getTagList')
  @ApiOperation({
    summary: '查询所有标签(有数量)',
  })
  async getTagList(): Promise<TagInterface[]> {
    return await this.tagService.getTagList();
  }
  @Post('delTag/:id')
  @HttpCode(200)
  @ApiOperation({
    summary: '删除标签',
  })
  async delTag(@Query('id') id :number): Promise<any> {
    return await this.tagService.delTag(id);
  }
  @Post('editTag')
  @HttpCode(200)
  @ApiOperation({
    summary: '编辑标签',
  })
  async editTag(@Body() body :TagEditDto): Promise<any> {
    return await this.tagService.editTag(body);
  }
  @Post('geTagListByPage')
  @HttpCode(200)
  @ApiOperation({
    summary: '获取标签列表',
  })
  async geTagListByPage(@Body() body :TagListDto): Promise<any> {
    const list = await this.tagService.getTagByPage(body);
    const total = await this.tagService.getTagCount();
    return{
      list,
      total
    }
  }
}
