/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArticleBaseDto {
  @ApiProperty()
  @IsNotEmpty({
    message: '文章标题不能为空',
  })
  artTitle: string;
  @ApiProperty()
  abstract: string;
  @IsNotEmpty({
    message: '文章分类不能为空',
  })
  @ApiProperty()
  category: string;
  @IsNotEmpty({
    message: '文章标签不能为空',
  })
  @ApiProperty()
  tag: string;
  @IsNotEmpty({
    message: '文章内容不能为空',
  })
  @ApiProperty()
  content: string;
  @ApiProperty()
  thumbnail: string;
  cdate?: number;
  editdate?: number;
  pv?: number;
  discuss?: number;
  status?: number;
  id?:number;
}
export class ArticleEditDto extends ArticleBaseDto{
  @ApiProperty()
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}
export class ArticleListDto{
  @ApiProperty({
    example:1
  })
  currentPage: number;
  @ApiProperty({
    example:10
  })
  limit: number;
}
export class ArticleSearchDto extends ArticleListDto{
  @ApiProperty()
  keyword: string;
}
export class ArticleCategoryDto extends ArticleListDto{
  @ApiProperty({
    example:1
  })
  categoryid: string;
}
export class ArticleTagDto extends ArticleListDto{
  @ApiProperty({
    example:1
  })
  tagid: string;
}
export class ArticleDelDto{
  @ApiProperty({
    example:1
  })
  id: string;
}
