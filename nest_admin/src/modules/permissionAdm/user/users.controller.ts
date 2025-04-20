import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { userAdm, usersMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/usersAdm';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseController } from 'src/common/BaseController';
import { userBaseMeta } from './meta';

@PermissionMeta(userAdm.value)
@Controller(userBaseMeta.value)
export class UsersController extends BaseController<CreateUserDto, UsersService> {
  constructor(private readonly userService: UsersService) {
    super(userService,'user')
  }

  @PermissionMeta(usersMeta.queryUser.value)
  @Get("page")
  queryUserPage(@Query() user) {
    return this.userService.queryUser(user);
  }

  // @PermissionMeta(usersMeta.queryUser.value)
  // @Get("list")
  // queryUser(@Query() user) {
  //   return this.userService.queryUser(user);
  // }

  @Get("menus")
  findUserRoleMenus() {
    return this.userService.findUserRoleMenus();
  }

  @PermissionMeta(usersMeta.saveUser.value)
  @Post("save")
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // @PermissionMeta(usersMeta.updateUser.value)
  // @Post("update")
  // updateUser(@Body() user) {
  //   return this.userService.updateUser(user);
  // }

  @PermissionMeta(usersMeta.updateUserRole.value)
  @Post("update-user-role")
  updateUserRole(@Body() user) {
    return this.userService.updateUserRole(user);
  }

  // @PermissionMeta(usersMeta.removeUser.value)
  // @Get("remove")
  // removeUser(@Query("id") id) {
  //   return this.userService.removeUser(id);
  // }

}