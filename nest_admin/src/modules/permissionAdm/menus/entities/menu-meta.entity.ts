import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class MenuMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({
    comment: '菜单标题',
    nullable: true,
  })
  title: string;




  @Column({
    comment: '菜单类型',
  })
  menuType: string;

  @Column({
    comment: '菜单图标',
    nullable: true,
  })
  icon: string;

  @Column({
    comment: '是否不缓存',
    default: false,
  })
  onCache: boolean;

  @Column({
    type: "char",
    default: 0,
    name: "hidden",
    comment: '是否隐藏,1是0否，默认0',
    transformer: { from: (value) => value - 0, to: (value: string) => value },
  })
  hidden: boolean;

  @OneToOne(() => Menu, (menu) => menu.meta)
  menu: Menu;

}