/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@libs/db/entity/article.entity';
import { User } from '@libs/db/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Link } from '@libs/db/entity/link.entity';
import { Tag } from '@libs/db/entity/tag.entity';
import { Comment } from '@libs/db/entity/comment.entity';
import { Category } from '@libs/db/entity/category.entity';
import { Config } from '@libs/db/entity/config.entity';
import config from '@common/common/config';

const entityArr = [User, Article, Link, Tag, Comment, Category, Config];

const entity = TypeOrmModule.forFeature(entityArr);
const devMode = process.env.NODE_ENV === 'development'
console.log(devMode,'=========')
@Global()
@Module({
  imports: [
    entity,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: config.DATABASE.user,
          password: config.DATABASE.password,
          database: config.DATABASE.database,
          entities: entityArr,
          // entities: ["dist/**/*.entity{.ts,.js}"],
          synchronize: true,
          charset: 'utf8mb4',
        };
      },
    }),
  ],
  providers: [],
  exports: [entity],
})
export class DbModule { }
