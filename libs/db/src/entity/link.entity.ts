/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:29
*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    comment: '网站名名',
    nullable: false,
  })
  siteName: string;

  @Column({
    type: 'text',
    comment: '网站地址',
    nullable: false,
  })
  siteUrl: string;

  @Column({
    type: 'text',
    comment: '网站头像',
    nullable: false,
  })
  siteHead: string;

  @Column({
    type: 'int',
    comment: '链接状态, 1-可用，0-不可用',
    nullable: true,
    default: 0,
  })
  status: number;

  @Column({
    type: 'bigint',
    comment: '创建时间',
    nullable: false,
    default: new Date().getTime(),
  })
  cdate: number;
}
