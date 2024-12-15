import { BaseEntity } from "src/common/entity/BaseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Dictionary } from "./dictionary.entity";

@Entity()
export class DictionaryOptions extends BaseEntity {
  @Column({
    comment: "键",
  })
  label: string;

  @Column({
    comment: "值",
  })
  value: string;

  @Column({
    comment: "字典备注",
    nullable: true,
  })
  remark: string;

  @Column({
    name: "dictionary_id",
  })
  dictionaryId: string;

  @ManyToOne(
    () => Dictionary,
    (dictionary) => dictionary.options, {
    onDelete: "CASCADE",
  }
  )
  @JoinColumn({
    name: "dictionary_id",
  })
  dictionary: Dictionary;
}