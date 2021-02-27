import { UserInterface } from './interface/user.interface';
import { UserBaseDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  @HttpCode(200)
  async register(@Body() params: UserBaseDto): Promise<UserInterface> {
    const resData = await this.userService.userRegister(params);
    return resData;
  }
  @Post('updateUserInfo')
  @ApiOperation({
    summary: '更新用户信息',
  })
  @HttpCode(200)
  //   @UseGuards(AuthGuard('jwt'))
  //   @UseGuards(AuthGuard('local'))
  //   @ApiBearerAuth()
  async updateUserInfo(@Body() params: UserUpdateDto): Promise<UserInterface> {
    const resData = await this.userService.userInfoUpdate(params);
    return resData;
  }
  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async login(@Body() params: UserBaseDto, @Req() req): Promise<UserInterface> {
    const payload = { username: req.user.username, id: req.user.id };
    const token = this.jwtService.sign(payload);

    const user = req.user;
    user.token = token;
    return user;
  }
  @Get('getUserInfo2')
  @ApiOperation({
    summary: '获取用户信息',
  })
  @HttpCode(200)
  // @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getUserInfo(@Query('id') id: number | string): Promise<UserInterface> {
    return await this.userService.getUserInfo({ id });
  }
  @Get('getUserInfo')
  @ApiOperation({
    summary: '获取用户信息',
  })
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'token',
    required: true,
    description: '本次请求请带上token',
  })
  async getUserInfo2(@Req() req): Promise<UserInterface> {
    return req.user;
  }
}
