/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
// import * as nuid from 'nuid;
import { join } from 'path';
import { guid } from '@common/common/utils';

const devMode = process.env.NODE_ENV === 'development';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: devMode
          ? `./public/uploads/${dayjs().format('YYYY-MM-DD')}`
          : `../public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        // destination: join(
        //   __dirname,
        //   './public/',
        //   `uploads/${dayjs().format('YYYY-MM-DD')}`,
        // ),
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${guid()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
          // return cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
