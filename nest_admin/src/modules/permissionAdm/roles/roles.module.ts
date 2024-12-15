import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { MenusModule } from '../menus/menus.module';
@Module({
  imports: [TypeOrmModule.forFeature([Role]),MenusModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
