/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { HttpException, HttpStatus } from '@nestjs/common';
export class CustomException extends HttpException {
  constructor(message: string, code = 400) {
    super({ message, code }, HttpStatus.OK);
  }
}
