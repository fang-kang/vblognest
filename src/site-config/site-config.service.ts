/* eslint-disable prettier/prettier */
import { SiteConfigInterface } from './interface/siteConfig.interface';
import { ConfigBaseDto, ConfigEditDto } from './dto/siteConfig.dto';
import { CustomException } from '@common/common/common/http.decoration';
import { Config } from '@libs/db/entity/config.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}
  /*
   *@Description: 添加公共配置
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 16:15:07
   */
  async addConfig(p: ConfigBaseDto): Promise<any> {
    const config = new Config();
    config.icp = p.icp;
    config.psr = p.psr;
    return this.configRepository
      .save(config)
      .then(() => {
        return config;
      })
      .catch(() => {
        throw new CustomException('添加失败');
      });
  }

  /*
   *@Description: 编辑公共配置
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 16:28:15
   */
  async editConfig(p: ConfigEditDto): Promise<any> {
    const data = await this.configRepository.findOne(p.id);
    if (!data) {
      throw new CustomException('暂无数据');
    }
    return this.configRepository
      .update(p.id, {
        icp: p.icp,
        psr: p.psr,
      })
      .then(() => {
        return p;
      })
      .catch(() => {
        throw new CustomException('编辑失败');
      });
  }

  /*
   *@Description: 获取公共配置
   *@Email:1793980864@qq.com
   *@Author: fk
   *@Date: 2021-02-28 16:28:30
   */
  async getConfig(): Promise<SiteConfigInterface[]> {
    const config = await this.configRepository.find();
    return config;
  }
}
