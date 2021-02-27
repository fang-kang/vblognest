import {
  ArticleBaseDto,
  ArticleCategoryDto,
  ArticleListDto,
  ArticleSearchDto,
  ArticleTagDto,
} from './dto/article.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@libs/db/entity/article.entity';
import { Repository } from 'typeorm';
import { CustomException } from '@common/common/common/http.decoration';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  /**
   *
   * 添加文章
   * @param {ArticleBaseDto} params
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async addArticle(params: ArticleBaseDto): Promise<any> {
    const currentTime = new Date().getTime();
    const newArticle = new Article();
    newArticle.id = currentTime;
    newArticle.artTitle = params.artTitle;
    newArticle.abstract = params.abstract;
    newArticle.category = params.category;
    newArticle.content = params.content;
    newArticle.tag = params.tag;
    newArticle.thumbnail = params.thumbnail;
    newArticle.cdate = currentTime;
    newArticle.editdate = currentTime;
    newArticle.pv = 0;
    newArticle.discuss = 0;
    newArticle.status = 0;
    return await this.articleRepository
      .save(newArticle)
      .then(() => {
        return newArticle;
      })
      .catch((err) => {
        console.log('addArticle-err', err);
        throw new CustomException('添加失败');
      });
  }

  /**
   *
   * 编辑文章
   * @param {ArticleBaseDto} params
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async editArticle(params: ArticleBaseDto): Promise<any> {
    const currentTime = new Date().getTime();
    const id = params.id;
    const data = await this.articleRepository.findOne({ id });
    if (!data) {
      throw new CustomException('id查询错误');
    }
    return await this.articleRepository
      .update(params.id, {
        artTitle: params.artTitle,
        abstract: params.abstract,
        category: params.category,
        content: params.content,
        tag: params.tag,
        thumbnail: params.thumbnail,
        editdate: currentTime,
      })
      .then(() => {
        return params;
      })
      .catch((err) => {
        console.log('editArticle-err', err);
        throw new CustomException('操作失败');
      });
  }

  /**
   *
   * 获取文章详情
   * @param {number} id
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async getDetail(id: number): Promise<any> {
    const data = await this.articleRepository.findOne({ id });
    if (!data) {
      throw new CustomException('操作失败');
    }
    return data;
  }

  /**
   *
   * 获取文章数量
   * @return {*}  {Promise<number>}
   * @memberof ArticleService
   */
  async getArtCount(): Promise<number> {
    return await this.articleRepository
      .createQueryBuilder('article')
      .getCount();
  }

  /**
   *
   * 删除文章
   * @param {number} id
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async delArticle(id: number): Promise<any> {
    const data = await this.articleRepository.findOne({ id });
    if (!data) {
      throw new CustomException('操作失败');
    }
    return await this.articleRepository
      .delete({ id })
      .then(() => {
        '删除成功';
      })
      .catch(() => {
        throw new CustomException('操作失败');
      });
  }

  /**
   *
   * 获取文章列表
   * @param {ArticleListDto} params
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async getArtList(params: ArticleListDto): Promise<any> {
    const artList = await this.articleRepository.query(`
    select
    A.id, A.artTitle, A.abstract, A.artDiscuss,
    (SELECT categoryname FROM category where FIND_IN_SET(A.category, id) ) as category,
    GROUP_CONCAT(T.tagname) as tag,
    A.thumbnail, A.pv,
    (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss,
    A.content,
    A.cdate,
    A.editdate ,
    A.status
    from article as A
    left join tag as T
    on FIND_IN_SET(T.id , A.tag)
    group by A.id
    ORDER BY A.cdate desc
    limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
`);
    return artList;
  }

  /**
   * 获取文章详情 *（加阅读量）
   * @param {number} id
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async getArticleDetail(id: number): Promise<any> {
    const sqlQuery = await this.articleRepository.query(`
        select A.id, A.artTitle, A.abstract, A.artDiscuss,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
        A.thumbnail, A.pv,
        (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss,
         A.content,
        FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate
        from article as A
        left join tag as T
        on FIND_IN_SET(T.id , A.tag)
        where A.status = 0 and A.id = ${id}
         group by A.id
    `);
    const articleDetail = sqlQuery[0];
    if (articleDetail.pv >= 0) {
      const newPv = articleDetail.pv + 1;
      articleDetail.pv = newPv;
      return await this.articleRepository
        .update(articleDetail.id, {
          pv: newPv,
        })
        .then(() => {
          return articleDetail;
        })
        .catch((err) => {
          console.log(err);
          throw new CustomException('操作失败');
        });
    }
  }

  /**
   *
   * 获取热门文章
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async getHotArticleList(): Promise<any> {
    const artList = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: 0 })
      .take(10)
      .orderBy('article.pv', 'DESC')
      .getMany();
    return artList;
  }

  /**
   *
   * 归档
   * @return {*}  {Promise<any>}
   * @memberof ArticleService
   */
  async getArchive(): Promise<any> {
    const archiveList = await this.articleRepository.query(`
        select A.id, A.artTitle, A.abstract,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
         A.thumbnail,
         A.pv,
        (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss,
         A.content,
        FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d') as cdate
        FROM article as A
        left join tag as T
        on FIND_IN_SET(T.id , A.tag)
        WHERE A.status = 0
        group by A.id
        ORDER BY A.cdate DESC;
    `);
    const archiveCount = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: 0 })
      .getCount();

    function getDateArr(arr: any[]) {
      const yearObj = {};
      const monthObj = {};
      for (let i = 0, len = arr.length; i < len; i++) {
        const YearIndex = arr[i].cdate.indexOf('-');
        const yearDate = arr[i].cdate.substr(0, YearIndex);
        if (!yearObj[yearDate]) {
          yearObj[yearDate] = [];
          yearObj[yearDate].push(arr[i]);
        } else {
          yearObj[yearDate].push(arr[i]);
        }
      }
      return yearObj;
    }

    const result = {
      list: getDateArr(archiveList),
      total: archiveCount,
    };
    return result;
  }
  async getArticleListAll(params: ArticleListDto): Promise<any> {
    const artList = await this.articleRepository.query(`
        select
        A.id, A.artTitle, A.abstract,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
        A.thumbnail, A.pv,
        (SELECT COUNT(*) FROM comment where artId = A.id and isChecked = 1) as discuss,
        A.content,
        FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate
        from article as A
        left join tag as T
        on FIND_IN_SET(T.id , A.tag)
        where A.status = 0
        group by A.id
        ORDER BY A.cdate desc
        limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
    `);
    const artCount = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.status = :status', { status: 0 })
      .getCount();

    const result = {
      list: artList,
      total: artCount,
    };
    return result;
  }
  async getArtListByKeywords(params: ArticleSearchDto): Promise<any> {
    const artListByCategory = await this.articleRepository.query(`
        select
        A.id, A.artTitle,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
        FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
        A.abstract, A.thumbnail, A.pv,
        (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss
        from article as A
        left join tag as T
        on FIND_IN_SET(T.id, A.tag)
        where (
            A.artTitle like "%${params.keyword}%"
            or
            A.content like "%${params.keyword}%"
            or
            A.abstract like "%${params.keyword}%"
        )
        AND A.status = 0
        group by A.id
        ORDER BY A.cdate DESC
        limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
    `);
    const artCount = await this.articleRepository.query(`
        SELECT COUNT(*) as total FROM article where
        (
            artTitle like "%${params.keyword}%"
            or
            content like "%${params.keyword}%"
            or
            abstract like "%${params.keyword}%"
        )
        and status = 0;

    `);
    const result = {
      list: artListByCategory,
      total: Number(artCount[0].total),
    };
    return result;
  }
  async getArtListByCategory(params: ArticleCategoryDto): Promise<any> {
    const artListByCategory = await this.articleRepository.query(`
        select
        A.id, A.artTitle,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
        FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
        A.abstract, A.thumbnail, A.pv,
        (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss
        from article as A
        left join tag as T
        on FIND_IN_SET(T.id, A.tag)
        where A.status = 0
        AND FIND_IN_SET('${params.categoryid}', A.category)
        group by A.id
        ORDER BY A.cdate DESC
        limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
    `);
    const artCount = await this.articleRepository.query(`
        SELECT COUNT(*) as total FROM article where status = 0 and FIND_IN_SET('${params.categoryid}', category);

    `);
    const result = {
      list: artListByCategory,
      total: Number(artCount[0].total),
    };
    return result;
  }
  async getArtListByTag(params: ArticleTagDto): Promise<any> {
    const artListByTag = await this.articleRepository.query(`
        select
        A.id, A.artTitle,
        (SELECT categoryname FROM category where status = 0 and FIND_IN_SET(A.category, id) ) as category,
        GROUP_CONCAT(T.tagname) as tag,
        FROM_UNIXTIME(A.cdate/1000, '%Y-%m-%d %H:%i') as cdate,
        A.abstract, A.thumbnail,
        (SELECT COUNT(*) FROM comment where artId = A.id ) as discuss,
        A.pv
        from article as A
        left join tag as T
        on FIND_IN_SET(T.id, A.tag)
        where A.status = 0
        AND FIND_IN_SET('${params.tagid}', A.tag)
        group by A.id
        ORDER BY A.cdate DESC
        limit ${(params.currentPage - 1) * params.limit}, ${params.limit};
    `);
    const artCount = await this.articleRepository.query(`
        SELECT COUNT(*) as total FROM article where status = 0 and FIND_IN_SET('${params.tagid}', tag);

    `);
    const result = {
      list: artListByTag,
      total: Number(artCount[0].total),
    };
    return result;
  }
}
