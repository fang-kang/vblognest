/* eslint-disable prettier/prettier */
/*
 *@Description: 
 *@Email:1793980864@qq.com
 *@Author: fk
 *@Date: 2021-02-16 22:08:40
*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int",
        comment: '用户id'
    })
    id: number

    @Column({
        type: "text",
        comment: '用户名',
        nullable: false
    })
    username: string

    @Column({
        type: "text",
        comment: '用户密码',
        select: false,
        nullable: false
    })
    password: string

    @Column({
        type: "text",
        comment: '用户昵称',
        nullable: true
    })
    nickname: string

    @Column({
        type: "text",
        comment: '用户头像',
        nullable: true,
    })
    avatar: string

    @Column({
        type: "text",
        comment: '用户签名',
        nullable: true
    })
    signature: string

    @Column({
        type: "bigint",
        comment: '用户创建时间',
        nullable: false,
        default: new Date().getTime()
    })
    cdate: number
}