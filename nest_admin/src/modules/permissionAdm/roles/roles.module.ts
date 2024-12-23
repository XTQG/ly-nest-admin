import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { MenusModule } from '../menus/menus.module';
import { PermissionModule } from '../permission/permission.module';
import { Permission } from '../permission/entities/permission.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Role,Permission]), MenusModule, PermissionModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
