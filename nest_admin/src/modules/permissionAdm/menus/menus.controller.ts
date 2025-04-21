import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { menusAdm, menusMeta } from 'src/common/metaData/permissionMetaData.ts/permissionAdm/menusAdm';
import { customMenusMeta, menusBaseMeta } from './meta';

@PermissionMeta(menusBaseMeta.value)
@Controller(menusBaseMeta.value)
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @PermissionMeta(customMenusMeta.saveMenu.value)
  @Post("save")
  createMenu(@Body() menuData: CreateMenuDto) {
    return this.menusService.createMenu(menuData)
  }

  @PermissionMeta(customMenusMeta.updateMenu.value)
  @Post("update")
  updateMenu(@Body() menu) {
    return this.menusService.updateMenu(menu)
  }

  // @PermissionMeta(menusMeta.menuPermission.value)
  // @Get("menu-permission")
  // findMenuPermissionList(@Query("id") id: string) {
  //   return this.menusService.findMenuPermissionList(id)
  // }


  @PermissionMeta(customMenusMeta.queryMenu.value)
  @Get("all")
  findAll() {
    return this.menusService.findAll()
  }

  // 查询菜单
  @PermissionMeta(customMenusMeta.queryMenu.value)
  @Get("list")
  queryMenu(@Query() menuReq) {
    return this.menusService.queryMenu(menuReq)
  }

  @PermissionMeta(customMenusMeta.removeMenu.value)
  @Get("remove")
  removeMenu(@Query("id") id: string) {
    return this.menusService.removeMenu(id)
  }

}
