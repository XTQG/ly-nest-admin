import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get()
  findAll(@Query() role) {
    return this.rolesService.findAll(role)
  }

  @Post("save")
  createRole(@Body() role: CreateRoleDto) {
    return this.rolesService.createRole(role);
  }

  @Post("update")
  updateRole(@Body() role: CreateRoleDto) {
    return this.rolesService.updateRole(role);
  }

  @Get("remove")
  removeRole(@Query("id") id: string) {
    return this.rolesService.removeRole(id);
  }

}
