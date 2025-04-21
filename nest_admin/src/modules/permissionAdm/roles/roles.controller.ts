import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { BaseController } from 'src/common/BaseController';
import { customRoleMeta, roleBaseMeta } from './meta';

@PermissionMeta(roleBaseMeta.value)
@Controller(roleBaseMeta.value)
export class RolesController extends BaseController<any, RolesService> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService, roleBaseMeta.value)
  }

  @PermissionMeta(customRoleMeta.queryRole.value)
  @Get("all")
  queryAll(@Query() role) {
    return this.rolesService.queryAll({...role})
  }
  // 设置角色权限
  @PermissionMeta(customRoleMeta.saveRolePermission.value)
  @Post("permission/save")
  async saveRolePermission(@Body() roleReq) {
    return await this.rolesService.saveRolePermission(roleReq)
  }

  // 获取角色权限
  @PermissionMeta(customRoleMeta.queryRolePermission.value)
  @Get("permission")
  findRolePermission(@Query("roleId") roleId) {
    return this.rolesService.findRolePermission(roleId)
  }

  // 查角色菜单
  @PermissionMeta(customRoleMeta.queryRoleMenu.value)
  @Get("menu")
  findRoleMenu(@Query("roleIds") roleIds) {
    return this.rolesService.findRoleMenu(roleIds)
  }

  @PermissionMeta(customRoleMeta.addRole.value)
  @Post("add")
  add(@Body() role) {
    role.menus = role.menus.map((id) => this.rolesService.newData({ id }))
    return this.rolesService.add(role);
  }

  @PermissionMeta(customRoleMeta.updateRole.value)
  @Post("update")
  update(@Body() role: any) {
    return this.rolesService.updateRole(role);
  }

  // @PermissionMeta(rolesMeta.removeRole.value)
  // @Get("remove")
  // removeRole(@Query("id") id: string) {
  //   return this.rolesService.removeRole(id);
  // }

}
