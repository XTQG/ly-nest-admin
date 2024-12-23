import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { rolePermissionAdm, rolePermissionMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/rolePermissionAdm';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';

@PermissionMeta(rolePermissionAdm.value)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get("Tree")
  getPermissionMetaTree() {
    return this.permissionService.getPermissionMetaTree()
  }

  // @PermissionMeta(permissionMeta.savePermission.value)
  // @Post("save")
  // createPermission(@Body() permission) {
  //   return this.permissionService.createPermission(permission)
  // }

  @PermissionMeta(rolePermissionMeta.removePermission.value)
  @Get("remove")
  removePermission(@Query("id") id) {
    return this.permissionService.removePermission(id)
  }

}
