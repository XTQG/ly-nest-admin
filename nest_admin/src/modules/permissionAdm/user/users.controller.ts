import { Controller, Get, Post, Body, Req, Query, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionMeta, PerPublic } from 'src/common/metaData/permissionMetaData.ts';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseController } from 'src/common/BaseController';
import { customUserMeta, userBaseMeta } from './meta';

@PermissionMeta(userBaseMeta.value)
@Controller(userBaseMeta.value)
export class UsersController extends BaseController<CreateUserDto, UsersService> {
  constructor(private readonly userService: UsersService) {
    super(userService, userBaseMeta.value)
  }

  // @PermissionMeta(usersMeta.queryUser.value)
  // @Get("page")
  // queryUserPage(@Query() user) {
  //   return this.userService.queryUser(user);
  // }

  // @PermissionMeta(usersMeta.queryUser.value)
  // @Get("list")
  // queryUser(@Query() user) {
  //   return this.userService.queryUser(user);
  // }

  @PermissionMeta(customUserMeta.menus.value)
  @Get("menus")
  findUserRoleMenus() {
    return this.userService.findUserRoleMenus();
  }

  @PermissionMeta(customUserMeta.list.value)
  @Get("list")
  async newList(@Query() query) {
    const { account, roleId } = query;
    const leftJoinAndSelect = { entity: "entity.roles", alias: "roles" };
    const where = { account: this.userService.sqlLike(account) };
    // console.log(roleId);
    const andWhere = roleId ? [["roles.id IN (:roleId)", { roleId: roleId }]] : null;
    return this.userService.list({ ...query, leftJoinAndSelect, where, andWhere });
  }

  // @PermissionMeta(usersMeta.saveUser.value)
  // @Post("save")
  // createUser(@Body() user: CreateUserDto) {
  //   return this.userService.createUser(user);
  // }

  // @PermissionMeta(usersMeta.updateUser.value)
  // @Post("update")
  // updateUser(@Body() user) {
  //   return this.userService.updateUser(user);
  // }


  @PermissionMeta(customUserMeta.update.value)
  @Post("update")
  async update(@Body() body) {

    const isExitsUser = await this.userService.queryOne({
      where: {
        account: body.account,
        isDeleted: 0,
      },
    });
    // console.log(isExitsUser);

    if (isExitsUser && isExitsUser.account !== body.account) {
      throw new HttpException({ message: "该账号名已被使用" }, 400);
    }

    return this.userService.update(body);
  }

  @PermissionMeta(customUserMeta.updateUserRole.value)
  @Post("update-user-role")
  updateUserRole(@Body() user) {
    return this.userService.updateUserRole(user);
  }

  @PerPublic()
  @PermissionMeta(customUserMeta.permission.value)
  @Get("role_permission")
  async queryUser() {
    const userId = await this.clsService.get('userId');
    return this.userService.findUserRolePermissions(userId);
  }
  // @PermissionMeta(usersMeta.removeUser.value)
  // @Get("remove")
  // removeUser(@Query("id") id) {
  //   return this.userService.removeUser(id);
  // }

}