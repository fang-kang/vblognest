import { TagInterface } from './interface/tag.interface';
import { CustomException } from './../../libs/common/src/common/http.decoration';
import { TagBaseDto } from './dto/tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './../../libs/db/src/entity/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   *
   *
   * @param {TagBaseDto} parmas
   * @return {*}  {Promise<any>}
   * @memberof TagService
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

  /**
   *
   *
   * @return {*}  {Promise<TagInterface[]>}
   * @memberof TagService
   */
  async getAll(): Promise<TagInterface[]> {
    return await this.tagRepository.find();
  }
  async getListById(): Promise<any> {
    const list = this.tagRepository.query(
      'select T.id,T.tagname from tag as T',
    );
    return await list;
  }
}
