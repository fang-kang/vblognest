/* eslint-disable prettier/prettier */
import { TagInterface } from './interface/tag.interface';
import { CustomException } from './../../libs/common/src/common/http.decoration';
import { TagBaseDto, TagListDto, TagEditDto } from './dto/tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './../../libs/db/src/entity/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) { }

  /*
   *@Description: 添加标签
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 14:56:28
  */
  async addTag(parmas: TagBaseDto): Promise<any> {
    const tag = await this.tagRepository.findOne({ tagname: parmas.tagname });
    if (tag) {
      throw new CustomException('标签名不能重复');
    }
    const newTag = new Tag();
    newTag.tagname = parmas.tagname;
    return await this.tagRepository
      .save(newTag)
      .then(() => {
        return newTag;
      })
      .catch(() => {
        throw new CustomException('添加失败');
      });
  }
  /*
   *@Description: 查询所有标签
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 14:58:07
  */
  async getAll(): Promise<TagInterface[]> {
    return await this.tagRepository.find();
  }
  /*
   *@Description: 查询所有标签
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 14:58:18
  */
  async getTagList(): Promise<TagInterface[]> {
    const tagList = await this.tagRepository.query(`
        select
        id, tagname,
        (SELECT COUNT(*) as total FROM article where status = 0 and FIND_IN_SET(T.id, tag) ) as total
        from tag  AS T
        where T.status = 0;
    `);
    return tagList;
  }
  /*
   *@Description: 删除标签
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:11:12
  */
  async delTag(id: number): Promise<any> {
    const data = await this.tagRepository.findOne(id);
    if (!data) {
      throw new CustomException('没有数据');
    }
    return await this.tagRepository
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
   *@Description: 编辑标签
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:21:43
  */
  async editTag(parmas: TagEditDto): Promise<any> {
    const data = await this.tagRepository.findOne(parmas.id);
    if (!data) {
      throw new CustomException('没有数据');
    }
    return await this.tagRepository
      .update(parmas.id, {
        tagname: parmas.tagname
      })
      .then(() => {
        return parmas;
      })
      .catch((err) => {
        console.log(err);
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 根据分页获取列表
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:34:06
  */
  async getTagByPage(p: TagListDto): Promise<TagInterface[]> {
    const list = await this.tagRepository
    .createQueryBuilder('tag')
    .skip((p.currentPage - 1) * p.limit)
    .take(p.limit)
    .orderBy('tag.cdate','DESC')
    .getMany()
    return list;
  }
  /*
   *@Description: 获取数量
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 15:35:04
  */
  async getTagCount():Promise<number>{
    const count = await this.tagRepository.createQueryBuilder('tag').getCount();
    return count
  }
}
