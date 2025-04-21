import { BadRequestException, Injectable, InternalServerErrorException, } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuMeta } from './entities/menu-meta.entity';
import { builderTree } from 'src/common/utils/comon';
@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRep: Repository<Menu>,
    @InjectRepository(MenuMeta)
    private readonly menuMetaRep: Repository<MenuMeta>,
  ) { }

  
  async findAll() {
    try {
      const menuList = await this.menuRep.find()
      // console.log(menuList);
      return menuList
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: "获取菜单失败",
      })
    }
  }

  // 根据菜单数据构建菜单树
  // async builderMenuTree(menuList) {
  //   const menuAll = await this.findAll()
  //   const menuAllMap = {}
  //   menuAll.forEach((menu) => {
  //     menuAllMap[menu.id] = menu
  //   })
  //   const parentList = []
  //   menuList.forEach((menu) => {
  //     const parent = menuAllMap[menu.parentId]
  //     if (parent) {
  //       parentList.push(parent)
  //     }
  //   })
  //   const menuMap = new Map()
  //   parentList.concat(menuList).forEach((menu) => {
  //     menuMap.set(menu.id, menu)
  //   })
  //   const menuResult = Array.from(menuMap)
  //   return builderTree(menuResult)
  // }

  // 查找菜单
  async queryMenu(menuReq) {
    try {
      const { title = '', isAllMenus = false } = menuReq
      const menuList = await this.menuRep.createQueryBuilder("menu")
        .leftJoinAndSelect("menu.meta", "meta")
        .where("meta.title LIKE :title", { title: `%${title}%` }).getMany()
      let allMenus = null
      // 查找所有菜单
      if (isAllMenus) {
        allMenus = await this.findAll()
      }
      return {
        menuList, allMenus
      }
      // 返回树结构
      // return this.builderMenuTree(queryMenu)
    } catch {
      throw new InternalServerErrorException({
        msg: "获取菜单失败",
      })
    }
  }

  // 树查询所有菜单
  // async treeFind() {
  //   const treeRep = this.menuRep as any
  //   const rootMenus = await treeRep.findTrees(
  //     {
  //       relations: ["meta"]
  //     },
  //   )
  //   return rootMenus
  // }

  // 查找单个菜单
  async findOne(id: string) {
    const menu = await this.menuRep.findOne({
      where: {
        id: id
      }
    })
    return menu
  }

  // 查找父级菜单
  async findParentMenu(id: string) {
    if (id) {
      const parentMenu = await this.findOne(id)
      if (!parentMenu) {
        throw new BadRequestException({
          message: "父级菜单不存在",
        })
      }
      return parentMenu
    }
  }

  // 新增菜单
  async createMenu(menuData: CreateMenuDto) {

    if (menuData.parentId == "") {
      throw new BadRequestException({
        message: "父级菜单不能为空字符串",
      })
    }

    // console.log(menuData);
    if (menuData?.parentId) {
      menuData.parent = await this.findParentMenu(menuData.parentId)
    }

    const newMenu = this.menuRep.create(menuData)
    // console.log(newMenu);

    const saveMenu = await this.menuRep.save(newMenu);
    return saveMenu
  }



  // 查找某个菜单的权限列表
  // async findMenuPermissionList(menuId: string) {
  //   const menuPermission = await this.menuRep.findOne({
  //     where: {
  //       id: menuId
  //     },
  //     relations: ["permission"]
  //   })
  //   return menuPermission.permission
  // }

  // 更新菜单
  async updateMenu(menu: UpdateMenuDto) {

    const newMenu = this.menuRep.create(menu)

    // console.log(menu);
    const parentId = newMenu?.parentId
    const menuData = await this.findOne(newMenu.id)

    if (!menuData) {
      throw new BadRequestException({
        message: "菜单不存在",
      })
    }

    if (parentId) {
      newMenu.parent = await this.findParentMenu(newMenu.parentId)
    } else {
      newMenu.parent = null
    }

    const newUpdateMenu = this.menuRep.create(newMenu)
    const updateMenu = await this.menuRep.save(newUpdateMenu)
    // console.log(updateMenu);

    return {}
  }

  // 删除菜单
  async removeMenu(id: string) {

    if (!id) {
      throw new BadRequestException({
        message: "要删除的菜单id不能为空字符串",
      })
    }

    const menu = await this.findOne(id)
    if (!menu) {
      throw new BadRequestException({
        message: "要删除的菜单不存在",
      })
    }
    await this.menuRep.remove(menu)
    await this.menuMetaRep.remove(menu.meta)
    return {}
  }
}
