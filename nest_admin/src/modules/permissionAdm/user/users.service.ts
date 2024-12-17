import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly clsService: ClsService
  ) { }

  async queryUser(user) {
    const users = await this.userRepository.find({
      where: {
        account: Like(`%${user.account}%`),
      },
      relations: ['roles'],
    });
    return users;
  }

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

  async createUser(user) {
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async updateUser(user) {
    return await this.userRepository.save(user);
  }

  async updateUserRole(user) {
    const roles = user.roles.map((item) => {
      return Object.assign(new Role(), { id: item })
    })
    user.roles = roles;
    const saveUser = await this.userRepository.save(user);
    return saveUser;
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }

}
