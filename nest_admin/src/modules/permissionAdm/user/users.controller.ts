import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { userAdm, usersMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/usersAdm';

@PermissionMeta(userAdm.value)
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @PermissionMeta(usersMeta.queryUser.value)
  @Get("list")
  queryUser(@Query() user) {
    return this.userService.queryUser(user);
  }

  @Get("menus")
  findUserRoleMenus() {
    return this.userService.findUserRoleMenus();
  }

  @PermissionMeta(usersMeta.saveUser.value)
  @Post("save")
  createUser(@Body() user) {
    return this.userService.createUser(user);
  }

  @PermissionMeta(usersMeta.updateUser.value)
  @Post("update")
  updateUser(@Body() user) {
    return this.userService.updateUser(user);
  }

  @PermissionMeta(usersMeta.updateUserRole.value)
  @Post("update-user-role")
  updateUserRole(@Body() user) {
    return this.userService.updateUserRole(user);
  }

  @PermissionMeta(usersMeta.removeUser.value)
  @Get("remove")
  removeUser(@Query("id") id) {
    return this.userService.removeUser(id);
  }

}