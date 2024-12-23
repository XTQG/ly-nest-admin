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
    // console.log(PermissionMetaData);
    return PermissionMetaData
  }

  // 设置角色权限
  async saveRolePermission(roleId, permissionList) {
    const delPermission = await this.permissionRep.delete({
      roleId
    })
    const savePermission = await this.permissionRep.save(permissionList)
    return;
  }

  // 删除权限
  async removePermission(id: string) {
    const res = await this.permissionRep.delete(id)
    return res
  }
}
