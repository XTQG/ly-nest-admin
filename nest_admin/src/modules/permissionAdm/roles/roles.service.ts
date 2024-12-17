import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, In, Repository } from 'typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRep: Repository<Role>,
  ) { }

  async findAll(role) {
    const { name = "" } = role
    // console.log(role);

    const roleData = await this.roleRep.find({
      where: {
        name: ILike(`%${name}%`)
      },
    })
    // console.log(roleData);
    return roleData
  }

  // 查角色菜单
  async findRoleMenu(roleIds) {
    const roleMenu = await this.roleRep.find({
      where: {
        id: In(roleIds)
      },
      relations: ["menus"]
    })
    let menuList = []
    roleMenu.forEach((item) => {
      menuList = menuList.concat(item.menus)
    })
    return menuList
  }

  // 设置角色权限
  async saveRolePermission(roleReq) {
    const { roleId, permissionIds } = roleReq
    const saveRole = await this.roleRep.save({
      id: roleId,
      permission: permissionIds.map((id) => Object.assign(new Permission(), { id }))
    })
    return this.findRolePermission(roleId)
  }

  // 获取角色权限
  findRolePermission(roleId) {
    return this.roleRep.findOne({
      where: {
        id: roleId
      },
      relations: ["permission"]
    })
  }

  async createRole(role) {
    role.menus = role.menus.map((id) => Object.assign(new Menu(), { id }))
    const save = await this.roleRep.save(role)
    return save
  }

  async updateRole(role) {
    if (!role?.id) {
      throw new BadRequestException({
        message: "缺少id参数"
      })
    }
    role.menus = role.menus.map((id) => Object.assign(new Menu(), { id }))
    const saveRole = await this.roleRep.save(role)
    return saveRole
  }

  async removeRole(id) {
    const deleteRole = await this.roleRep.delete(id)
    return deleteRole
  }

}