import { BaseEntity } from "src/common/entity/BaseEntity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Menu } from "./menu.entity";
import { Role } from "src/modules/roles/entities/role.entity";

@Entity()
export class Permission extends BaseEntity {
  @Column({
    comment: '权限名称',
  })
  name: string;

  @Column({
    comment: '权限描述',
    nullable: true,
  })
  desc: string;

  @Column({
    comment: '接口地址',
  })
  url: string;

  @Column({
    comment: '请求方式',
    type: 'enum',
    enum: ['GET', 'POST'],
  })
  method: string;

  @Column({
    comment: '所属菜单',
    name: 'menu_id',
  })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.permission)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToMany(() => Role, (role) => role.permission)
  role: Role[];

}