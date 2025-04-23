import { Controller, Get, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { customPermissionMeta, permissionBaseMeta } from './meta';

@PermissionMeta(permissionBaseMeta.value)
@Controller(permissionBaseMeta.value)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }


  // 获取权限树
  @PermissionMeta(customPermissionMeta.tree.value)
  @Get("Tree")
  getPermissionMetaTree() {
    return this.permissionService.getPermissionMetaTree()
  }

  // 删除权限
  @PermissionMeta(customPermissionMeta.remove.value)
  @Get("remove")
  removePermission(@Query("id") id) {
    return this.permissionService.removePermission(id)
  }

}
