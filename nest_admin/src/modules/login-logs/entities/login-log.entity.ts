import { BaseEntity } from "src/common/entity/BaseEntity";
import {  Column, Entity } from "typeorm";

@Entity('login_logs')
export class LoginLog extends BaseEntity {

  @Column({
    comment: '登录账号',
    nullable: false,
  })
  account: string

  @Column({
    comment: 'ip地址',
    nullable: true,
  })
  ip: string

  @Column({
    comment: '登录地点',
    nullable: true,
  })
  address: string

  @Column({
    comment: '浏览器类型',
  })
  browser: string

  @Column({
    comment: '操作系统',
  })
  os: string

  @Column({
    comment: '是否登录成功',
    nullable: true,
  })
  isSuccess: number

  @Column({
    length: 500,
    default: '登录成功',
    comment: '提示消息',
  })
  msg: string

}
