/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-28 16:50:54
*/
export interface CommentInterface {
  id: number;
  //文章id
  artId: number;
  //评论内容
  content: any;
  //评论者昵称
  from_uname: string;
  //评论者邮箱
  from_uemail: string;
  //评论者头像
  from_uavatar: string;
  //评论者网址
  from_uweb: string;
  //评论回复时间
  cdate: number;
  //被回复者邮箱
  to_uname: string;
  //被回复者头像
  to_uavatar: string;
  //被回复者昵称
  to_uemail: string;
  //被回复者网址
  to_uweb: string;
  //被回复的内容
  oldContent: string;
  //被回复的内容的回复时间
  oldCdate: number;
  //被回复内容的id
  oldId: number;
  //评论是否审核过 1-通过；0-不通过
  isChecked: number;
}
