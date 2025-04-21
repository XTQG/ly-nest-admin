import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, In, Repository } from 'typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { PermissionService } from '../permission/permission.service';
import { BaseService } from 'src/common/BaseService';

@Injectable()
export class RolesService extends BaseService<Role, Repository<Role>> {

  constructor(
    @InjectRepository(Role)
    private readonly roleRep: Repository<Role>,
    private readonly permissionService: PermissionService,
  ) {
    super(roleRep);
  }

  // async findAll(role) {
  //   const { name = "" } = role
  //   // console.log(role);

  //   const roleData = await this.roleRep.find({
  //     where: {
  //       name: ILike(`%${name}%`)
  //     },
  //   })
  //   // console.log(roleData);
  //   return roleData
  // }

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
    const { roleId, permissionList } = roleReq    
    const savePermission = await this.permissionService.saveRolePermission(roleId, permissionList)
    return savePermission;
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

  // async createRole(role) {
  //   role.menus = role.menus.map((id) => Object.assign(new Menu(), { id }))
  //   const save = await this.roleRep.save(role)
  //   return save
  // }

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

  // async removeRole(id) {
  //   const deleteRole = await this.roleRep.delete(id)
  //   return deleteRole
  // }

}