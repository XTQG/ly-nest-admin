import { BaseEntity } from "src/common/entity/BaseEntity";
import { Menu } from "src/modules/permissionAdm/menus/entities/menu.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Entity()
export class Role extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 55,
    comment: '角色名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '备注',
  })
  remark: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_role_relation'
  })
  users: User[];

  @ManyToMany(() => Permission, permission => permission.role)
  @JoinTable()
  permission: Permission[]

  @ManyToMany(() => Menu, menu => menu.roles, { cascade: true, onDelete: "CASCADE" })
  @JoinTable({
    name: "role_menu_relation",
    joinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "menu_id",
      referencedColumnName: "id",
    },
  })
  menus: Menu[];

}