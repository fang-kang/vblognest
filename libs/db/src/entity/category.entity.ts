/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:12
*/
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    comment: '分类名称',
    nullable: false,
  })
  categoryname: string;

  @Column({
    type: 'int',
    comment: '分类状态, 1-可用，0-不可用',
    nullable: false,
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
