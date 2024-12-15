import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { menuPermissionAdm, permissionMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/menuPermissionAdm';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';

@PermissionMeta(menuPermissionAdm.value)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get("permissionMetaTree")
  getPermissionMetaTree() {
    return this.permissionService.getPermissionMetaTree()
  }

  @PermissionMeta(permissionMeta.savePermission.value)
  @Post("save")
  createPermission(@Body() permission) {
    return this.permissionService.createPermission(permission)
  }

  @PermissionMeta(permissionMeta.removePermission.value)
  @Get("remove")
  removePermission(@Query("id") id) {
    return this.permissionService.removePermission(id)
  }

}
