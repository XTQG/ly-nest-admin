import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @Post("save")
  createMenu(@Body() menuData: CreateMenuDto) {
    return this.menusService.createMenu(menuData)
  }

  @Post("update")
  updateMenu(@Body() menu) {
    return this.menusService.updateMenu(menu)
  }

  @Post("save-permission")
  createPermission(@Body() permission) {
    return this.menusService.createPermission(permission)
  }

  @Get("menu-permission")
  findMenuPermissionList(@Query("id") id: string) {
    return this.menusService.findMenuPermissionList(id)
  }

  @Get()
  findAll(@Query() menu: QueryMenuDto) {
    return this.menusService.findAll(menu)
  }

  @Get("tree")
  treeFind() {
    return this.menusService.treeFind()
  }

  @Get("remove")
  removeMenu(@Query("id") id: string) {
    console.log(id);
    return this.menusService.removeMenu(id)
  }

}
