/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:23
*/

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'int',
    comment: '网站是否开启留言： 1-开启；0-关闭',
    default: 1,
    nullable: false,
  })
  discussStatus: number;

  @Column({
    type: 'text',
    comment: 'ICP备案号',
    nullable: false,
  })
  icp: string;

  @Column({
    type: 'text',
    comment: '公安备案号：The public security for the record',
    nullable: false,
  })
  psr: string;
}
