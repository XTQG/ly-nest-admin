import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './../user/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from '@node-rs/bcrypt';
import { MenusService } from './../menus/menus.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly menusService: MenusService,
  ) { }

  // 根据用户拥有的菜单
  async userMenus(user) {
    const userMenus = await this.usersService.findUserRoleMenus(user.userId)
    const menuMap = new Map()
    // 去重
    userMenus.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        menuMap.set(menu.id, menu)
      })
    })
    // 转化成数组
    const menuList = Array.from(menuMap.values())
    const menuAllParent = await Promise.all(menuList.map(async (menu) => {
      return await this.menusService.findMenuParent(menu)
    }))
    const allMenuMap = new Map()
    const menuAllParentMap = menuAllParent.forEach((menu) => {
      menu.forEach((item) => {
        allMenuMap.set(item.id, item)
      })
    })

    const menuAllParentList = Array.from(allMenuMap.values())

    const builderTree = (menuList, parentId = null) => {
      const menuTreeList = []
      menuList.forEach((menu) => {
        if (menu.parentId === parentId) {
          const menuItem = {
            ...menu,
            children: builderTree(menuList, menu.id)
          }
          menuTreeList.push(menuItem)
        }
      })
      return menuTreeList
    }

    return builderTree(menuAllParentList)

  }

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
    const towToken = await this.generateToken(token.userId)
    return towToken
  }

}
