/* eslint-disable prettier/prettier */
import { CategoryInterface } from './interface/category.interface';
import {
  CategoryBaseDto,
  CategoryDelDto,
  CategoryListDto,
  CategoryEditDto,
} from './dto/category.dto';
import { CategoryService } from './category.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('addCategory')
  @HttpCode(200)
  @ApiOperation({
    summary: '添加分类',
  })
  async addCategory(@Body() body: CategoryBaseDto): Promise<CategoryInterface> {
    return await this.categoryService.addCategory(body);
  }
  @Get('getAll')
  @ApiOperation({
    summary: '查询所有分类',
  })
  async getAll(): Promise<CategoryInterface[]> {
    return await this.categoryService.getAll();
  }
  @Get('getCategoryList2')
  @ApiOperation({
    summary: '查询所有分类(有数量)',
  })
  async getCategoryList2(): Promise<CategoryInterface[]> {
    return await this.categoryService.getCategoryList2();
  }
  @Post('getCategoryList')
  @HttpCode(200)
  @ApiOperation({
    summary: '查询所有分类',
  })
  async getCategoryList(@Body() params: CategoryListDto): Promise<any> {
    const list = await this.categoryService.getCategoryList(params);
    const count = await this.categoryService.getCategoryCount();

    const result = {
      list: list,
      total: count,
    };

    return result;
  }
  @Post('deleteCategory')
  @HttpCode(200)
  @ApiOperation({
    summary: '删除分类',
  })
  async deleteCategory(@Body() params: CategoryDelDto): Promise<any> {
    return await this.categoryService.deleteCategory(params);
  }
  @Post('updateCategory')
  @HttpCode(200)
  @ApiOperation({
    summary: '编辑分类',
  })
  async updateCategory(@Body() params: CategoryEditDto): Promise<any> {
    return await this.categoryService.updateCategory(params);
  }
}
