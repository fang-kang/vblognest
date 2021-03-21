/* eslint-disable prettier/prettier */
import {
  ArticleBaseDto,
  ArticleCategoryDto,
  ArticleDelDto,
  ArticleEditDto,
  ArticleListDto,
  ArticleSearchDto,
  ArticleTagDto,
} from './dto/article.dto';
import { ArticleService } from './article.service';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @ApiOperation({
    summary: '添加文章',
  })
  @Post('addArtile')
  @HttpCode(200)
  async addArtile(@Body() body: ArticleBaseDto): Promise<any> {
    return await this.articleService.addArticle(body);
  }
  @ApiOperation({
    summary: '修改文章',
  })
  @Post('editArtile')
  @HttpCode(200)
  async editArtile(@Body() body: ArticleEditDto): Promise<any> {
    return await this.articleService.editArticle(body);
  }
  @ApiOperation({
    summary: '查询文章详情',
  })
  @Get('getDetail')
  async getDetail(@Query('id') id :number): Promise<any> {
    return await this.articleService.getDetail(id);
  }
  @ApiOperation({
    summary: '查询文章数量',
  })
  @Get('getArticleCount')
  async getArticleCount(): Promise<number> {
    return await this.articleService.getArtCount();
  }
  @ApiOperation({
    summary: '删除文章',
  })
  @HttpCode(200)
  @Post('delArticle')
  async delArticle(@Body() p :ArticleDelDto): Promise<any> {
    return await this.articleService.delArticle(p);
  }
  @Post('getArticleList')
  @ApiOperation({
    summary: '获取文章列表',
  })
  @HttpCode(200)
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiHeader({
  //   description: 'token',
  //   name: 'token',
  //   required: true,
  // })
  async getArticleList(@Body() params: ArticleListDto): Promise<any> {
    const artList = await this.articleService.getArtList(params);
    const artCount = await this.articleService.getArtCount();

    const result = {
      list: artList,
      total: artCount,
    };

    return result;
  }
  @Get('getArticleDetail')
  @ApiOperation({
    summary: '获取文章详情(加阅读量)',
  })
  @HttpCode(200)
  async getArticleDetail(@Query('id') id :number): Promise<any> {
    const artDetail = await this.articleService.getArticleDetail(id);
    return artDetail;
  }
  @Get('getArticleHot')
  @ApiOperation({
    summary: '获取热门文章',
  })
  @HttpCode(200)
  async getArticleHot(): Promise<any> {
    const artHotList = await this.articleService.getHotArticleList();

    return artHotList;
  }
  @Post('getArchive')
  @ApiOperation({
    summary: '文章归档',
  })
  @HttpCode(200)
  async getArchive(): Promise<any> {
    const archiveList = await this.articleService.getArchive();
    return archiveList;
  }
  @Post('getArtByKeyword')
  @ApiOperation({
    summary: '根据关键词-获取文章列表',
  })
  @HttpCode(200)
  async getArtByKeyword(@Body() params: ArticleSearchDto): Promise<any> {
    const artList = await this.articleService.getArtListByKeywords(params);
    return artList;
  }

  @Post('getArtByCategory')
  @ApiOperation({
    summary: '根据分类-获取文章列表',
  })
  @HttpCode(200)
  async getArtByCategory(@Body() params: ArticleCategoryDto): Promise<any> {
    const artList = await this.articleService.getArtListByCategory(params);
    return artList;
  }
  @Post('getArticleListByTag')
  @ApiOperation({
    summary: '根据标签-获取文章列表',
  })
  @HttpCode(200)
  async getArticleListByTag(@Body() params: ArticleTagDto): Promise<any> {
    const artList = await this.articleService.getArtListByTag(params);
    return artList;
  }
}