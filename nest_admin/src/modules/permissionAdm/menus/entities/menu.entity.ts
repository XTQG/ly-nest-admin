import { BaseEntity } from "src/common/entity/BaseEntity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, Tree, TreeChildren, TreeParent } from "typeorm";
import { MenuMeta } from "./menu-meta.entity";
import { Role } from "../../roles/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";


@Tree("closure-table")
@Entity()
export class Menu extends BaseEntity {
  @Column({
    comment: '路由路径',
  })
  path: string;

  @Column({
    comment: '路由名称',
  })
  name: string;

  @Column({
    comment: '排序',
  })
  sort: number;

  @Column({
    nullable: true,
    comment: '路由组件',
  })
  component: string;

  @Column({
    nullable: true,
    comment: '路由重定向',
  })
  redirect: string

  @Column({
    comment: '路由描述',
    nullable: true,
    select: false,
  })
  desc: string;

  // @Column({
  //   type: "char",
  //   default: 0,
  //   name: "is_hidden",
  //   comment: '是否隐藏,1是0否，默认0',
  //   transformer: { from: (value) => value - 0, to: (value: string) => value },
  // })
  // isHidden: number;

  @Column({
    nullable: true,
    default: null,
    name: 'parent_id',
    comment: '父级id',
    transformer: { from: (value) => value, to: (value: string) => value },
  })
  parentId: string

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Menu;

  @TreeChildren()
  children: Menu[];

  @Column({
    name: 'meta_id',
  })
  metaId: string;

  @OneToOne(() => MenuMeta, meta => meta.menu, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: 'meta_id' })
  meta: MenuMeta;

  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];

  // @OneToMany(() => Permission, (permission) => permission.menu, {
  //   cascade: true,
  //   eager: true,
  //   onDelete: "CASCADE",
  // })
  // permission: Permission[];


}
