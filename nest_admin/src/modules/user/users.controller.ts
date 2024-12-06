import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post("save")
  createUser(@Body() user) {
    return this.userService.createUser(user);
  }

  @Post("update")
  updateUser(@Body() user) {
    return this.userService.updateUser(user);
  }

  @Post("update-user-role")
  updateUserRole(@Body() user) {
    return this.userService.updateUserRole(user);
  }

  @Get("remove")
  removeUser(@Query("id") id) {
    return this.userService.removeUser(id);
  }

}