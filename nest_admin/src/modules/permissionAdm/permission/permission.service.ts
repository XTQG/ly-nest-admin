import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionMetaData } from 'src/common/metaData/permissionMetaData.ts';
import { CacheService } from 'src/modules/cache/cache.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRep: Repository<Permission>,
    private readonly redisService: CacheService,
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
    // console.log(savePermission);

    const isExistRole = await this.redisService.get('role_' + roleId)

    if (isExistRole) {
      const role = JSON.parse(isExistRole)
      role.permission = savePermission
      await this.redisService.set('role_' + roleId, role)
    }

    return;
  }

  // 删除权限
  async removePermission(id: string) {
    const res = await this.permissionRep.delete(id)
    return res
  }
}
