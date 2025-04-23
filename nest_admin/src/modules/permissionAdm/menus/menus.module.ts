import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuMeta } from './entities/menu-meta.entity';
import { Role } from '../roles/entities/role.entity';
import { CacheModule } from 'src/modules/cache/cache.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuMeta, Role]), CacheModule],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService]
})
export class MenusModule { }
