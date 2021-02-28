/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentListDto {
    @ApiProperty({
        example: 1,
    })
    currentPage: number;
    @ApiProperty({
        example: 10,
    })
    limit: number;
}

export class CommentArtDto extends CommentListDto{
    @ApiProperty({
        example: 1612851256810
    })
    @IsNotEmpty({
        message: '文章id不能为空'
    })
    artId: number;
}


export class CommentCheckDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'id不能为空'
    })
    id: number;
    @ApiProperty({
        example: 10,
    })
    @IsNotEmpty({
        message: 'isChecked不能为空'
    })
    isChecked: number
}
export class CommentAddDto {
    @ApiProperty({
        example: '1793980864@qq.com'
    })
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    email: string;

    @ApiProperty({
        example: 1612851256810
    })
    @IsNotEmpty({
        message: '文章id不能为空'
    })
    artId: number;

    @IsNotEmpty({
        message: '评论内容不能为空'
    })
    @ApiProperty({ example: '内容' })
    content: any;

    @ApiProperty({
        example: '小明'
    })
    @IsNotEmpty({
        message: '昵称不能为空'
    })
    nickname: string;

    @ApiProperty({
        example: 'www.baidu.com'
    })
    webUrl: string;
    @IsNotEmpty({
        message: '网址不能为空'
    })

    @ApiProperty({
        example: 'http://fang-kang.gitee.io/blog/2021/01/31/vue/vue_router/'
    })
    @IsNotEmpty({
        message: '文章链接不能为空'
    })
    articleURL: string;


    @ApiProperty()
    oldId: number;
}

export class CommentReplyDto {
    @ApiProperty({
        example: '1793980864@qq.com'
    })
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    email: string;

    @ApiProperty({
        example: 1612851256810
    })
    @IsNotEmpty({
        message: '文章id不能为空'
    })
    artId: number;

    @IsNotEmpty({
        message: '评论内容不能为空'
    })
    @ApiProperty({ example: '内容' })
    content: any;

    @ApiProperty({
        example: '小明'
    })
    @IsNotEmpty({
        message: '昵称不能为空'
    })
    nickname: string;

    @ApiProperty({
        example: 'www.baidu.com'
    })
    webUrl: string;
    @IsNotEmpty({
        message: '网址不能为空'
    })

    @ApiProperty({
        example: 'http://fang-kang.gitee.io/blog/2021/01/31/vue/vue_router/'
    })
    @IsNotEmpty({
        message: '文章链接不能为空'
    })
    articleURL: string;


    @ApiProperty()
    oldId: number;

    @ApiProperty({
        example: '回复的小林'
    })
    @IsNotEmpty({
        message: '被回复者昵称不能为空'
    })
    touname: string;

    @ApiProperty({
        example: 'https://fang-kang.gitee.io/blog-img/head.jpg'
    })
    @IsNotEmpty({
        message: '被回复者头像不能为空'
    })
    touavatar: string;

    @ApiProperty({
        example: '18766977313@qq.com'
    })
    @IsNotEmpty({
        message: '被回复者邮箱不能为空'
    })
    touemail: string;

    @ApiProperty({
        example: 'www.baidu.com'
    })
    @IsNotEmpty({
        message: '被回复者网址不能为空'
    })
    touweb: string;

    @ApiProperty({
        example: '被回复的内容'
    })
    @IsNotEmpty({
        message: '被回复的内容不能为空'
    })
    oldContent: string;

    
    @ApiProperty({
        example: 9090909090
    })
    @IsNotEmpty({
        message: '被回复的内容的回复时间不能为空'
    })
    oldCdate: number;
}