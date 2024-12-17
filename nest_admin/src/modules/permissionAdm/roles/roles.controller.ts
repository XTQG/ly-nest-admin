import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { rolesAdm, rolesMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/rolesAdm';

@PermissionMeta(rolesAdm.value)
@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @PermissionMeta(rolesMeta.queryRole.value)
  @Get()
  findAll(@Query() role) {
    return this.rolesService.findAll(role)
  }

  // 设置角色权限
  @Post("permission/save")
  async saveRolePermission(@Body() roleReq) {
    return await this.rolesService.saveRolePermission(roleReq)
  }

  // 获取角色权限
  @Get("permission")
  findRolePermission(@Query("roleId") roleId) {
    return this.rolesService.findRolePermission(roleId)
  }

  // 查角色菜单
  @Get("menu")
  findRoleMenu(@Query("roleIds") roleIds) {
    return this.rolesService.findRoleMenu(roleIds)
  }

  @PermissionMeta(rolesMeta.saveRole.value)
  @Post("save")
  createRole(@Body() role: CreateRoleDto) {
    return this.rolesService.createRole(role);
  }

  @PermissionMeta(rolesMeta.updateRole.value)
  @Post("update")
  updateRole(@Body() role: CreateRoleDto) {
    return this.rolesService.updateRole(role);
  }

  @PermissionMeta(rolesMeta.removeRole.value)
  @Get("remove")
  removeRole(@Query("id") id: string) {
    return this.rolesService.removeRole(id);
  }

}
