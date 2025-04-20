import * as dayjs from "dayjs";
import { BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      to: (date) => date,
    },
    comment: '创建时间',
  })
  createTime: string;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'update_time',
    // default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      from: (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      to: (date) => date,
    },
    comment: '更新时间',
  })
  // @UpdateDateColumn()
  updateTime: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'create_user',
    comment: '创建人',
  })
  createUser: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'update_user',
    comment: '更新人',
  })
  updateUser: string;

  @Column({
    type: 'char',
    default: 0,
    name: 'is_deleted',
    comment: '是否删除: NULL未删除，1删除',
  })
  isDeleted: number;

  @BeforeUpdate()
  updateTimestamp() {
    delete this.updateTime
    delete this.createTime
    delete this.createUser
  }
}

