import { LinkCreateDto, LinkListDto, LinkEditDto, LinkDelDto } from './dto/link.dto';
import { Repository } from 'typeorm';
import { Link } from './../../libs/db/src/entity/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CustomException } from '@common/common/common/http.decoration';
import { LinkInterface } from './interface/link.interface';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) { }
  /*
   *@Description: 获取友链
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async getLink(): Promise<any> {
    // return await this.linkRepository.query(`
    //     select siteName, siteUrl, siteHead from link;
    // `);
    return await this.linkRepository.find()
}
  /*
   *@Description: 添加友链
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async addLink(params: LinkCreateDto): Promise<any> {
    const link = new Link();
    link.siteName = params.siteName;
    link.siteUrl = params.siteUrl;
    link.siteHead = params.siteHead;
    return this.linkRepository
      .save(link)
      .then(() => {
        return link;
      })
      .catch((err) => {
        console.log('addLink-err=', err);
        throw new CustomException('操作失败');
      });
  }
  /*
  *@Description: 获取数量
  *@MethodAuthor: fk
  *@Date: 2021-02-27 12:16:53
  */
  async getLinkCount(): Promise<number> {
    return await this.linkRepository.createQueryBuilder('link').getCount()
  }
  /*
  *@Description: 获取友链列表
  *@MethodAuthor: fk
  *@Date: 2021-02-27 12:16:53
  */
  async getLinkList(params: LinkListDto): Promise<LinkInterface[]> {
    const linkList = await this.linkRepository.createQueryBuilder('link')
      .skip((params.currentPage - 1) * params.limit)
      .take(params.limit)
      .orderBy("link.cdate", "DESC")
      .getMany()
    return linkList
  }
  /*
   *@Description: 编辑友链
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async updateLink(params: LinkEditDto): Promise<any> {
    let data = await this.linkRepository.findOne(params.id);
    if(!data){
      throw new CustomException('暂无数据')
    }
    return await this.linkRepository.update(params.id, {
      siteName: params.siteName,
      siteUrl: params.siteUrl,
      siteHead: params.siteHead
    }).then(() => {
      return params
    }).catch((err) => {
      console.log('updateLink-err=', err)
      throw new CustomException('操作失败')
    })
  }
  /*
   *@Description: 删除友链
   *@MethodAuthor: fk
   *@Date: 2021-02-27 12:16:53
   */
  async deleteLink(params :LinkDelDto): Promise<any> {
    let data = await this.linkRepository.findOne(params.id);
    if(!data){
      throw new CustomException('暂无数据')
    }
    return await this.linkRepository.remove(data).then(()=>{
      return '删除成功'
    }).catch(err=>{
      console.log(err)
      throw new CustomException('操作失败')
    })
  }
}
