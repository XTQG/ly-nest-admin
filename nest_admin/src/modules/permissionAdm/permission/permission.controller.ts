import { Controller, Get, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get("Tree")
  getPermissionMetaTree() {
    return this.permissionService.getPermissionMetaTree()
  }

  @Get("remove")
  removePermission(@Query("id") id) {
    return this.permissionService.removePermission(id)
  }

}
