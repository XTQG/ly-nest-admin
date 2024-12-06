import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll() {
    const users = await this.userRepository.find({
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
  async findUserRoleMenus(userId: string) {
    return await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['roles.menus.meta'],
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
