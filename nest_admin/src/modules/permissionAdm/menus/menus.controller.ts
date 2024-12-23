import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { menusAdm, menusMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/menusAdm';

@PermissionMeta(menusAdm.value)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @PermissionMeta(menusMeta.saveMenu.value)
  @Post("save")
  createMenu(@Body() menuData: CreateMenuDto) {
    return this.menusService.createMenu(menuData)
  }

  @PermissionMeta(menusMeta.updateMenu.value)
  @Post("update")
  updateMenu(@Body() menu) {
    return this.menusService.updateMenu(menu)
  }

  // @PermissionMeta(menusMeta.menuPermission.value)
  // @Get("menu-permission")
  // findMenuPermissionList(@Query("id") id: string) {
  //   return this.menusService.findMenuPermissionList(id)
  // }

  @Get("all")
  findAll() {
    return this.menusService.findAll()
  }

  // 查询菜单
  @PermissionMeta(menusMeta.queryMenu.value)
  @Get("list")
  queryMenu(@Query() menuReq) {
    return this.menusService.queryMenu(menuReq)
  }

  @PermissionMeta(menusMeta.removeMenu.value)
  @Get("remove")
  removeMenu(@Query("id") id: string) {
    return this.menusService.removeMenu(id)
  }

}
