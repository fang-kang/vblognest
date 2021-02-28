import { CommentInterface } from './interface/comment.interface';
import {
  CommentListDto,
  CommentCheckDto,
  CommentAddDto,
  CommentReplyDto,
  CommentArtDto,
} from './dto/comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { Body, Controller, HttpCode, Post, Get, Query } from '@nestjs/common';

@ApiTags('评论管理')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('getComment')
  @ApiOperation({
    summary: '获取评论列表',
  })
  @HttpCode(200)
  async getCommentsList(@Body() p: CommentListDto): Promise<any> {
    const list = await this.commentService.getCommentsList(p);
    const total = await this.commentService.getCommentsCount();
    const result = {
      list,
      total,
    };
    return result;
  }
  @Get('getCommentById/:id')
  @ApiOperation({
    summary: '获取评论详情',
  })
  async getCommentById(@Query('id') id: number): Promise<CommentInterface> {
    return this.commentService.getCommentById(id);
  }
  @Post('checkComment')
  @ApiOperation({
    summary: '审核评论',
  })
  @HttpCode(200)
  async editLink(@Body() params: CommentCheckDto): Promise<CommentInterface> {
    const checkInfo = await this.commentService.updateComment(params);
    return checkInfo;
  }
  @Post('deleteComment')
  @ApiOperation({
    summary: '删除评论',
  })
  @HttpCode(200)
  async deleteLink(@Body() id: number): Promise<any> {
    const delInfo = await this.commentService.deleteLink(id);
    return delInfo;
  }
  @Post('addComment')
  @ApiOperation({
    summary: '添加文章评论',
  })
  @HttpCode(200)
  async addComment(@Body() params: CommentAddDto): Promise<any> {
    const addComment = await this.commentService.addComment(params);
    return addComment;
  }
  @Post('addReplyComment')
  @ApiOperation({
    summary: '回复文章评论',
  })
  @HttpCode(200)
  async addReplyComment(@Body() params: CommentReplyDto): Promise<any> {
    const addComment = await this.commentService.replyComment(params);
    return addComment;
  }

  @Post('getComment')
  @ApiOperation({
    summary: '获取文章评论列表',
  })
  @HttpCode(200)
  async getComment(@Body() params: CommentArtDto): Promise<any> {
    const commentList = await this.commentService.getComment(params);
    return commentList;
  }
}
