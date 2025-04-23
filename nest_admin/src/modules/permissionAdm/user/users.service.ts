import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
// import { Role } from '../roles/entities/role.entity';
import { ClsService } from 'nestjs-cls';
import { BaseService } from 'src/common/BaseService';
import { CacheService } from 'src/modules/cache/cache.service';

@Injectable()
export class UsersService extends BaseService<User, UsersService> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clsService: ClsService,
    private redisService: CacheService,
  ) {
    super(userRepository)
  }

  // async queryUser(user) {
  //   const { account, pageSize, currentPage, } = user
  //   // const { pageSize, currentPage } = page
  //   // const users = await this.userRepository.find({
  //   //   where: {
  //   //     account: Like(`%${user.account}%`),
  //   //   },
  //   //   relations: ['roles'],
  //   // });
  //   // return users;
  //   let users = await this.userRepository.createQueryBuilder("user").andWhere({
  //     account: Like(`%${account}%`)
  //   })

  //   if (pageSize && currentPage) {
  //     return await users.leftJoinAndSelect("user.roles", "roles").skip((currentPage - 1) * pageSize).take(pageSize).getManyAndCount()
  //   } else {
  //     return await users.leftJoinAndSelect("user.roles", "roles").getMany()
  //   }
  // }

  async findOne(account: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'account', 'password', 'roles'],
      where: {
        account: account,
      },
      relations: ['roles'],
    });
    return user;
  }

  // 获取用户菜单
  async findUserRoleMenus() {
    const userId = this.clsService.get('userId');
    const menuMap = new Map()

    const isExistUserRoles = await this.redisService.get('userRole_' + userId)
    if (isExistUserRoles) {
      const userRoles = JSON.parse(isExistUserRoles)
      const roles = []
      let hasRole = true
      for (const role of userRoles) {
        const isExistRole = await this.redisService.get('role_' + role)
        if (isExistRole) {
          roles.push(JSON.parse(isExistRole))
        } else {
          hasRole = false
          break
        }
      }
      if (hasRole) {
        // const menuMap = new Map()
        // 去重
        roles.forEach((role) => {
          role.menus.forEach((menu) => {
            menuMap.set(menu.id, menu)
          })
        })
        // 转化成数组
        const userMenu = Array.from(menuMap.values())
        return userMenu
      }
    }

    const userAndMenu = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['roles.menus.meta'],
    })

    // 去重
    userAndMenu.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        menuMap.set(menu.id, menu)
      })
    })
    // 转化成数组
    const userMenu = Array.from(menuMap.values())
    this.redisService.set('userRole_' + userId, JSON.stringify(userMenu))
    return userMenu
  }

  // 获取用户权限
  async findUserRolePermissions(userId: string) {

    if (!userId) {
      userId = this.clsService.get('userId');
    }

    const isExistUser = await this.redisService.get('userId_' + userId)

    if (isExistUser) {
      const userRoles = JSON.parse(isExistUser)
      let roles = []
      const newMap = new Map()
      let hasRole = true
      for (const role of userRoles) {
        const isExistRole = await this.redisService.get('role_' + role.id)
        if (isExistRole) {
          roles = roles.concat(JSON.parse(isExistRole))
        } else {
          hasRole = false
          break
        }
      }
      if (hasRole) {
        return roles
      }
    }
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['roles.permission']
    })

    if (!user) {
      throw new ForbiddenException('用户不存在,请重新登录')
    }
    user.roles
    return user.roles
  }



  // async createUser(user) {
  //   const newUser = await this.userRepository.create(user);
  //   return await this.userRepository.save(newUser);
  // }

  // async updateUser(user) {
  //   const newUser = await this.userRepository.create(user);
  //   return await this.userRepository.save(newUser);
  // }

  async updateUserRole(user) {
    // const roles = user.roles.map((item) => {
    //   return Object.assign(new Role(), { id: item })
    // })
    const roles = user.roles.map((item) => {
      return {
        id: item
      }
    })
    user.roles = roles;

    await this.userRepository.save(user);
    return {}
  }

  // async removeUser(id: string) {
  //   return await this.userRepository.delete(id);
  // }

}
