/* eslint-disable prettier/prettier */
import { Category } from './../../libs/db/src/entity/category.entity';
import { CategoryInterface } from './interface/category.interface';
import { CustomException } from './../../libs/common/src/common/http.decoration';
import {
  CategoryBaseDto,
  CategoryDelDto,
  CategoryEditDto,
  CategoryListDto,
} from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   *
   *
   * @param {CategoryBaseDto} parmas
   * @return {*}  {Promise<any>}
   * @memberof CategoryService
   */
  async addCategory(parmas: CategoryBaseDto): Promise<any> {
    const category = await this.categoryRepository.findOne({
      categoryname: parmas.categoryname,
    });
    if (category) {
      throw new CustomException('分类名不能重复');
    }
    const newCategory = new Category();
    newCategory.categoryname = parmas.categoryname;
    return await this.categoryRepository
      .save(newCategory)
      .then(() => {
        return newCategory;
      })
      .catch(() => {
        throw new CustomException('添加失败');
      });
  }

  /**
   *
   *
   * @return {*}  {Promise<CategoryInterface[]>}
   * @memberof CategoryService
   */
  async getAll(): Promise<CategoryInterface[]> {
    return await this.categoryRepository.find();
  }
  /*
   *@Description: 获取数量
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async getCategoryCount(): Promise<number> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .getCount();
  }
  /*
   *@Description: 获取分类列表
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async getCategoryList(params: CategoryListDto): Promise<CategoryInterface[]> {
    const categoryList = await this.categoryRepository
      .createQueryBuilder('category')
      .skip((params.currentPage - 1) * params.limit)
      .take(params.limit)
      .orderBy('category.cdate', 'DESC')
      .getMany();
    return categoryList;
  }
  /*
   *@Description: 编辑分类
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async updateCategory(params: CategoryEditDto): Promise<any> {
    const data = await this.categoryRepository.findOne(params.id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return await this.categoryRepository
      .update(params.id, {
        categoryname: params.categoryname,
      })
      .then(() => {
        return params;
      })
      .catch((err) => {
        console.log('updateLink-err=', err);
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 删除分类
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async deleteCategory(params: CategoryDelDto): Promise<any> {
    const data = await this.categoryRepository.findOne(params.id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return await this.categoryRepository
      .remove(data)
      .then(() => {
        return '删除成功';
      })
      .catch((err) => {
        console.log(err);
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 获取分类列表
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async getCategoryList2(): Promise<CategoryInterface[]> {
    const categoryList = await this.categoryRepository.query(`
        select
        id, categoryname,
        (SELECT COUNT(*) as total FROM article where status = 0 and FIND_IN_SET(C.id, category) ) as total
        from category  AS C
        where C.status = 0;
    `);
    return categoryList;
  }
}
