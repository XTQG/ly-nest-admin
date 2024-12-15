import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "../../menus/entities/menu.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Permission  {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({
    comment: '权限名称',
  })
  label: string;

  @Column({
    comment: '权限名称',
  })
  value: string;

  @Column({
    comment: '所属菜单的id',
    name: 'menu_id',
  })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.permission)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToMany(() => Role, (role) => role.permission)
  role: Role[];

}