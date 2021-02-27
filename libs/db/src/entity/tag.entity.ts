/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:35
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    comment: '标签名称',
    nullable: false,
  })
  tagname: string;

  @Column({
    type: 'int',
    comment: '标签状态, 0-可用，1-不可用',
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
