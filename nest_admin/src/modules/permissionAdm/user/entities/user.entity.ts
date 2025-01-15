import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "@node-rs/bcrypt";
import { BaseEntity } from "src/common/entity/BaseEntity";
import { Role } from "../../roles/entities/role.entity";

@Entity('user')
export class User extends BaseEntity {

  @Column({
    unique: true,
    comment: '账号',
    length: 20,
    nullable: false,
  })
  account: string

  @Column({
    select: false,
    comment: '密码',
    nullable: false,
  })
  password: string

  @ManyToMany(() => Role, { cascade: true, })
  @JoinTable({
    name: 'user_role_relation'
  })
  roles: Role[]

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}