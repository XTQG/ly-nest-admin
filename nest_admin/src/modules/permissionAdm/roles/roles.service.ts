import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { PermissionService } from '../permission/permission.service';
import { BaseService } from 'src/common/BaseService';
import { CacheService } from 'src/modules/cache/cache.service';

@Injectable()
export class RolesService extends BaseService<Role, Repository<Role>> {

  constructor(
    @InjectRepository(Role)
    private readonly roleRep: Repository<Role>,
    private readonly permissionService: PermissionService,
    private readonly redisService: CacheService,
  ) {
    super(roleRep);
  }

  async initRoles() {
    const roles = await this.roleRep.find({
      relations: ["menus", "permission"]
    });
    for (const role of roles) {
      await this.redisService.set('role_' + role.id, JSON.stringify(role));
    }
    // console.log(roles);
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

    let roles = []
    let hasRole = true
    for (const roleId of roleIds) {
      const isExistRole = await this.redisService.get('role_' + roleId)
      if (isExistRole) {
        const role = JSON.parse(isExistRole).menus
        roles.push(role)
      } else {
        hasRole = false
      }
    }

    if (!hasRole) {
      roles = await this.roleRep.find({
        where: {
          id: In(roleIds)
        },
        relations: ["menus"]
      })
    }

    let menuList = []
    roles.forEach((item) => {
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
  async findRolePermission(roleId) {

    const isExistRole = await this.redisService.get('role_' + roleId)
    if (isExistRole) {
      const role = JSON.parse(isExistRole)
      return role.permission
    }

    const permission = await this.roleRep.findOne({
      where: {
        id: roleId
      },
      relations: ["permission"]
    })

    return permission.permission
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

    const isExistRole = await this.redisService.get('role_' + role.id)
    if (isExistRole) {
      const existRole = JSON.parse(isExistRole)
      await this.redisService.set('role_' + role.id, JSON.stringify({ ...saveRole, permission: existRole.permission }))
    }
    // console.log(saveRole);
    return {}
  }

  // async removeRole(id) {
  //   const deleteRole = await this.roleRep.delete(id)
  //   return deleteRole
  // }

}