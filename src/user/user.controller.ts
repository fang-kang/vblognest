/* eslint-disable prettier/prettier */
import { UserInterface } from './interface/user.interface';
import { UserBaseDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CommonIdDto, CommonListDto } from './../../libs/common/src/dto/common.dto';
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
  ) { }
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
    return await req.user;
  }
  @Post('delUser')
  @ApiOperation({
    summary: '删除用户',
  })
  @HttpCode(200)
  async delUser(@Body() p: CommonIdDto): Promise<any> {
    const resData = await this.userService.delUser(p);
    return resData;
  }
  @Get('getUserList')
  @ApiOperation({
    summary: '查询用户列表',
  })
  async getUserList(): Promise<UserInterface[]> {
    const resData = await this.userService.getUserList();
    return resData;
  }
  @Post('getUserListByPage')
  @HttpCode(200)
  @ApiOperation({
    summary: '查询用户列表(分页)',
  })
  async getUserListByPage(@Body() p: CommonListDto): Promise<any> {
    const resData = await this.userService.getUserListByPage(p);
    return resData;
  }
}
