import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
// import { Role } from '../roles/entities/role.entity';
import { ClsService } from 'nestjs-cls';
import { BaseService } from 'src/common/BaseService';

@Injectable()
export class UsersService extends BaseService<User, UsersService> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clsService: ClsService
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
    const userAndMenu = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['roles.menus.meta'],
    })

    const menuMap = new Map()
    // 去重
    userAndMenu.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        menuMap.set(menu.id, menu)
      })
    })
    // 转化成数组
    return Array.from(menuMap.values())
  }

  // 获取用户权限
  findUserPermissions(userId: string) {
    return this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['roles.permission']
    })
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
