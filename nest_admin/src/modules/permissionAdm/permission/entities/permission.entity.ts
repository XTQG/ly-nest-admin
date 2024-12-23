import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Menu } from "../../menus/entities/menu.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  // @Column({
  //   comment: '权限名称',
  // })
  // label: string;

  @Column({
    comment: '权限名称',
  })
  value: string;

  @Column({
    comment: '所属角色的id',
    name: 'role_id',
  })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.permission)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // @ManyToMany(() => Role, (role) => role.permission)
  // role: Role[];

}