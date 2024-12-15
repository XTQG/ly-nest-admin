import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionMetaData } from 'src/common/metaData/permissionMetaData.ts';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRep: Repository<Permission>,
  ) { }

  // 获取权限元数据树
  getPermissionMetaTree() {
    return PermissionMetaData
  }

  // 新增权限
  async createPermission(permission) {
    const { menuId, permissionList } = permission
    // console.log(menuId, permissionList);
    const isDel = await this.permissionRep.delete({ menuId: menuId })
    // console.log(isDel);
    const savePermission = await this.permissionRep.insert(permissionList)
    return savePermission

  }

  // 删除权限
  async removePermission(id: string) {
    const res = await this.permissionRep.delete(id)
    return res
  }
}
