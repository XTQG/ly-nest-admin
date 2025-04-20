import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from '@node-rs/bcrypt';
import { ClsService } from 'nestjs-cls';
import { UsersService } from '../permissionAdm/user/users.service';
import { CaptchaService } from '../common/captcha.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly clsService: ClsService,
    private readonly captchaService: CaptchaService,
  ) { }

  // 生成token
  async generateToken(id: string) {
    return {
      // 短token
      access_token: await this.jwtService.signAsync({
        id: id
      }, {
        expiresIn: '3d'
      }),
      // 长 token 用于刷新短 token
      refresh_token: await this.jwtService.signAsync({
        id: id,
      }, {
        expiresIn: '7d' //7天过期
      })
    }
  }

  // 登录
  async login(user: LoginDto) {

    if (!user.username) {
      throw new HttpException('用户名不能为空', 400);
    }

    if (!user.password) {
      throw new HttpException('密码不能为空', 400);
    }
    // 验证码验证
    let validateCaptcha = this.captchaService.validateCaptcha(user.uuid, user.code)
    if (validateCaptcha !== 'true') {
      throw new HttpException({ message: '验证码错误' }, 400);
    }

    const existUser = await this.usersService.findOne(user.username);
    // 判断用户是否存在
    if (!existUser) {
      throw new BadRequestException({
        code: 400,
        msg: "用户不存在"
      })
    }

    // 密码校验
    const isValid = await bcrypt.compare(user.password, existUser.password)
    if (!isValid) {
      throw new BadRequestException({
        code: 400,
        msg: "密码错误"
      })
    }

    const towToken = await this.generateToken(existUser.id)

    return {
      ...towToken,
      tokenKey: "Authorization",
      userInfo: { ...existUser, password: "" },
    }
  }

  // 注册
  async register(user: any) {

    // 验证码验证
    let validateCaptcha = this.captchaService.validateCaptcha(user.uuid, user.code)
    if (validateCaptcha !== 'true') {
      throw new HttpException({ message: '验证码错误' }, 400);
    }

    const existUser = await this.usersService.findOne(user.account)
    if (existUser) {
      throw new HttpException({
        message: "用户已存在"
      }, 400)
    }

    return await this.usersService.createUser(user)

  }

  // 刷新token
  async refreshToken(token) {
    const userId = this.clsService.get('userId');
    const towToken = await this.generateToken(userId)
    return towToken
  }

}
