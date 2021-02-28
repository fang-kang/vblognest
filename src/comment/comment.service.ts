import {
  CommentListDto,
  CommentCheckDto,
  CommentAddDto,
  CommentReplyDto,
  CommentArtDto,
} from './dto/comment.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@libs/db/entity/comment.entity';
import { CommentInterface } from './interface/comment.interface';
import { CustomException } from '@common/common/common/http.decoration';
import { FilterContent, setAvatar } from '@common/common/common/utils.common';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  /*
   *@Description: 获取评论数量
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 16:54:31
   */
  async getCommentsCount(): Promise<number> {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .getCount();
  }
  /*
   *@Description: 根据页码获取评论列表
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 16:56:34
   */
  async getCommentsList(p: CommentListDto): Promise<CommentInterface[]> {
    const commentsList = await this.commentRepository.query(`
        select
        C.id, C.artId, C.content, C.from_uname,
        (SELECT artTitle FROM article where FIND_IN_SET(C.artId, id) ) as artTitle,
        C.from_uemail, C.from_uavatar,
        C.from_uweb,
        C.cdate,
        C.to_uname ,
        C.to_uemail ,
        C.to_uweb ,
        C.oldContent ,
        C.oldCdate ,
        C.isChecked ,
        C.to_uavatar
        from comment as C
        ORDER BY C.cdate desc
        limit ${(p.currentPage - 1) * p.limit}, ${p.limit};
    `);
    return commentsList;
  }
  /*
   *@Description: 获取评论详情
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 17:01:01
   */
  async getCommentById(id: number): Promise<any> {
    const data = await this.commentRepository.findOne(id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return data;
  }
  /*
   *@Description: 审核评论
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 17:03:22
   */
  async updateComment(params: CommentCheckDto): Promise<any> {
    const data = await this.commentRepository.findOne(params.id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return await this.commentRepository
      .update(params.id, {
        isChecked: params.isChecked,
      })
      .then(async () => {
        if (params.isChecked === 1) {
          const affectedData = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.id= :id', { id: params.id })
            .getOne();
          return affectedData;
        }
        return '审核失败';
      })
      .catch(() => {
        throw new CustomException('操作失败');
      });
  }
  async deleteLink(id: number): Promise<any> {
    const data = await this.commentRepository.findOne(id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return this.commentRepository
      .remove(data)
      .then(() => {
        return '删除成功';
      })
      .catch(() => {
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 添加评论
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 17:17:07
   */
  async addComment(params: CommentAddDto): Promise<any> {
    const newComment = new Comment();
    const cdate = new Date().getTime();
    const from_uavatar = setAvatar(params.email);
    newComment.artId = Number(FilterContent(params.artId));
    newComment.content = FilterContent(params.content);
    newComment.from_uname = FilterContent(params.nickname);
    newComment.from_uemail = FilterContent(params.email);
    newComment.from_uavatar = FilterContent(from_uavatar);
    newComment.from_uweb = FilterContent(params.webUrl);
    newComment.cdate = cdate;
    newComment.to_uname = null;
    newComment.to_uavatar = null;
    newComment.to_uemail = null;
    newComment.to_uweb = null;
    newComment.oldContent = null;
    newComment.oldCdate = null;
    newComment.artURL = params.articleURL;
    newComment.oldId = params.oldId;
    return await this.commentRepository
      .save(newComment)
      .then(() => {
        const emailParams = {
          nickname: FilterContent(params.nickname),
          from_uavatar: FilterContent(from_uavatar),
          cdate,
          content: FilterContent(params.content),
          toURL: FilterContent(params.articleURL),
          subject: '',
        };
        if (newComment.artId === 0) {
          emailParams.subject = '有人在你的博客留言了，点击查看详情！';
        } else {
          emailParams.subject = '有人评论了你的文章，点击查看详情！';
        }
        return 'success';
      })
      .catch((err) => {
        console.log(err);
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 回复评论
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 17:31:30
   */
  async replyComment(params: CommentReplyDto): Promise<any> {
    const newComment = new Comment();
    const cdate = new Date().getTime();
    const from_uavatar = setAvatar(params.email);
    newComment.artId = Number(FilterContent(params.artId));
    newComment.content = FilterContent(params.content);
    newComment.from_uname = FilterContent(params.nickname);
    newComment.from_uemail = FilterContent(params.email);
    newComment.from_uavatar = FilterContent(from_uavatar);
    newComment.from_uweb = FilterContent(params.webUrl);
    newComment.cdate = cdate;
    newComment.to_uname = FilterContent(params.touname);
    newComment.to_uavatar = FilterContent(params.touavatar);
    newComment.to_uemail = FilterContent(params.touemail);
    newComment.to_uweb = FilterContent(params.touweb);
    newComment.oldContent = FilterContent(params.oldContent);
    newComment.oldCdate = Number(FilterContent(params.oldCdate));
    newComment.artURL = params.articleURL;
    return await this.commentRepository
      .save(newComment)
      .then(() => {
        const emailParams = {
          nickname: FilterContent(params.nickname),
          from_uavatar: FilterContent(from_uavatar),
          touemail: FilterContent(params.touemail),
          cdate,
          content: FilterContent(params.content),
          toURL: FilterContent(params.articleURL),
          subject: '博客留言回复提醒',
        };
        return 'success';
      })
      .catch(() => {
        throw new CustomException('操作失败');
      });
  }
  /*
   *@Description: 获取评论
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 17:42:13
   */
  async getComment(params: CommentArtDto): Promise<any> {
    const commentList = await this.commentRepository.query(`
        select id,
        content,
        cdate as timestamp,
        from_uname,
        from_uavatar,
        from_uweb,
        from_uemail,
        oldContent,
        to_uname,to_uavatar,to_uweb,to_uemail,
        FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i') as cdate ,
        FROM_UNIXTIME(oldCdate/1000,'%Y-%m-%d  %H:%i') as oldCdate
        from comment where artId = ${params.artId} and isChecked = 1
        ORDER BY cdate desc
        limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
    `);
    const commentCount = await this.commentRepository.query(`
        select count(*) as total from comment where artId = ${params.artId} and isChecked = 1 ;
   `);
    const result = {
      list: commentList,
      total: Number(commentCount[0].total),
    };
    return result;
  }
}
