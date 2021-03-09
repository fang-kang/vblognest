import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileUploadDto } from './dto/file.dto';
import { join } from 'path';
@ApiTags('文件上传')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @HttpCode(200)
  @ApiOperation({
    summary: '图片上传',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择图片',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFile(@UploadedFile() file) {
    const devMode = process.env.NODE_ENV === 'development';
    // 这里的 file 已经是保存后的文件信息了，在此处做数据库处理，或者直接返回保存后的文件信息
    // const buckets =await this.storageService.getBuckets()
    console.log(file);
    const a = devMode ? 'http://localhost:3001/' : 'http://8.130.31.13:3001/';
    const url = a + file.path;
    return url;
  }
}
