import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from '@node-rs/bcrypt';
import { MenusService } from '../permissionAdm/menus/menus.service';
import { ClsService } from 'nestjs-cls';
import { UsersService } from '../permissionAdm/user/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly clsService: ClsService
  ) { }

  // 生成token
  async generateToken(id: string) {
    return {
      access_token: await this.jwtService.signAsync({
        id: id
      }, {
        expiresIn: '8h' //1小时过期，这里短点方便验证
      }), //将token返回给客户端
      refresh_token: await this.jwtService.signAsync({
        id: id,
      }, {
        expiresIn: '7d' //7天过期
      })
    }
  }

  // 登录
  async login(user: LoginDto) {
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

  // 刷新token
  async refreshToken(token) {
    const userId = this.clsService.get('userId');
    const towToken = await this.generateToken(userId)
    return towToken
  }

}
