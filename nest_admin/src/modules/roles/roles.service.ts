import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { Menu } from '../menus/entities/menu.entity';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRep: Repository<Role>,
  ) { }

  async findAll(role) {
    const { name = null } = role
    // console.log(role);

    const roleData = await this.roleRep.find({
      where: {
        name: ILike(`%${name}%`)
      },
      relations: ["menus"]
    })
    // console.log(roleData);
    return roleData
  }

  async createRole(role) {
    role.menus = role.menus.map((id) => Object.assign(new Menu(), { id }))
    const save = await this.roleRep.save(role)
    return save
  }

  async updateRole(role) {
    if (!role?.id) {
      throw new BadRequestException({
        message: "缺少id参数"
      })
    }
    role.menus = role.menus.map((id) => Object.assign(new Menu(), { id }))
    const saveRole = await this.roleRep.save(role)
    return saveRole
  }

  async removeRole(id) {
    const deleteRole = await this.roleRep.delete(id)
    return deleteRole
  }
  
}