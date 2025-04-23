import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { MenusModule } from '../menus/menus.module';
import { PermissionModule } from '../permission/permission.module';
import { Permission } from '../permission/entities/permission.entity';
import { CacheModule } from 'src/modules/cache/cache.module';
@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), MenusModule, PermissionModule, CacheModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule implements OnModuleInit {

  constructor() { }

  @Inject(RolesService)
  private readonly rolesService: RolesService

  // 模块初始化
  async onModuleInit() {
    await this.rolesService.initRoles();
  }

}
