/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from '@libs/db/db.module';
import { CommonModule } from '@common/common/common.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { LinkModule } from './link/link.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    UserModule,
    DbModule,
    CommonModule,
    TagModule,
    CategoryModule,
    ArticleModule,
    LinkModule,
    SiteConfigModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
