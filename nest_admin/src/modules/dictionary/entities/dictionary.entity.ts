import { BaseEntity } from "src/common/entity/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { DictionaryOptions } from "./dictionary-options.entity";

@Entity()
export class Dictionary extends BaseEntity {
  @Column({
    comment: "字典名称",
  })
  name: string;

  @Column({
    comment: "字典编码",
  })
  code: string;

  @Column({
    comment: "字典备注",
  })
  remark: string;

  @OneToMany(
    () => DictionaryOptions,
    (options) => options.dictionary, {
    cascade: true
  }
  )
  options: DictionaryOptions[];
}