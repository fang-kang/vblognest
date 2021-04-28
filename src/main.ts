/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
// import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/common/filters/http-exception.filter';
import { TransformInterceptor } from '@common/common/interface/transform.interceptor';
// import { LoggerMiddleware } from '@common/common/middleware/logger.middleware';
import { ValidationPipe } from '@common/common/pipes/validation.pipe';
import * as express from 'express';
import { join } from 'path';
import config from '@common/common/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //开启一个全局验证管道
  // app.use(LoggerMiddleware)
  // 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
   const rootDir = join(__dirname, '..');
  app.use('/public', express.static(join(rootDir, 'public')));
  // app.useStaticAssets(join(__dirname, '../public/', 'uploads'), {
  //   prefix: '/uploads/', // 虚拟名称 http://localhost:3010/uploads/...png
  // });
  // app.useStaticAssets(join(__dirname, '../public/','uploads'))
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('v-blog接口文档') //标题
    .setDescription('v-blog接口文档介绍') //文档介绍
    .setVersion('1.0.0') //文档版本
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // setup()依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/doc', app, document);
  //跨域
  // app.useStaticAssets('public');
  app.enableCors();
  // app.use(
  //   rateLimit({
  //     windowMs: 10 * 60 * 1000, // 10 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  await app.listen(config.PORT);
}
bootstrap();
