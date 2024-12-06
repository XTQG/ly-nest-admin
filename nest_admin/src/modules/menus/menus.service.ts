import { BadRequestException, Injectable, InternalServerErrorException, Query } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { QueryMenuDto } from './dto/query-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuMeta } from './entities/menu-meta.entity';
import { Permission } from './entities/permission.entity';
@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRep: Repository<Menu>,
    @InjectRepository(MenuMeta)
    private readonly menuMetaRep: Repository<MenuMeta>,
    @InjectRepository(Permission)
    private readonly permissionRep: Repository<Permission>,
  ) { }

  async findAll(menu: QueryMenuDto) {
    try {
      const { title = '', ids = null } = menu
      const createBuilder = await this.menuRep.createQueryBuilder("menu")
        .leftJoinAndSelect("menu.meta", "meta")
        .where("meta.title LIKE :title", { title: `%${title}%` })

      if (ids && ids.length > 0) {
        createBuilder.andWhere("menu.id IN (:ids)", { ids: ids })
      }
      const menuList = await createBuilder.getMany()
      // console.log(menuList);
      return menuList
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: "获取菜单失败",
      })
    }
  }

  async findMenuParent(id: string) {
    const treeRep = this.menuRep as any
    const ancestors = await treeRep.findAncestors(id, {
      relations: ["meta"],
    })
    return ancestors
  }

  // 树结构查询
  async treeFind() {
    const treeRep = this.menuRep as any
    const rootMenus = await treeRep.findTrees(
      {
        relations: ["meta"]
      }
    )
    return rootMenus
  }

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

  async createPermission(permission) {
    const newPermission = this.permissionRep.create(permission)
    const savePermission = await this.permissionRep.save(newPermission)
    return savePermission
  }

  async findMenuPermissionList(id: string) {
    const menuPermission = await this.menuRep.findOne({
      where: {
        id: id
      },
      relations: ["permission"]
    })
    return menuPermission.permission
  }

  async updateMenu(menu: UpdateMenuDto) {
    const parentId = menu?.parentId
    const menuData = await this.findOne(menu.id)

    if (!menuData) {
      throw new BadRequestException({
        message: "菜单不存在",
      })
    }

    if (parentId) {
      menu.parent = await this.findParentMenu(menu.parentId)
    } else {
      menu.parent = null
    }

    const newUpdateMenu = this.menuRep.create(menu)
    const updateMenu = await this.menuRep.save(newUpdateMenu)
    // console.log(updateMenu);

    return menu
  }

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
