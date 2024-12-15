import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm';
import { DictionaryOptions } from './entities/dictionary-options.entity';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRep: Repository<Dictionary>,
    @InjectRepository(DictionaryOptions)
    private readonly optionsRep: Repository<DictionaryOptions>,
  ) { }

  createOptions(options: any) {
    if (!options.dictionaryId) {
      throw new BadRequestException({
        msg: "dictionaryId不能为空"
      })
    }
    this.optionsRep.save(options)
    return {}
  }

  findDictionaryOptions(dictionaryId:string) {
    return this.optionsRep.find({
      where: {
        dictionaryId: dictionaryId
      }
    })
  }

  findAll() {
    return this.dictionaryRep.find()
  }

  create(dictionary) {
    console.log(dictionary);
    const saveDictionary = this.dictionaryRep.save(dictionary)
    return {}
  }

  update(dictionary) {
    if (!dictionary.id) {
      throw new BadRequestException({
        msg: "id不能为空"
      })
    }
    const newDictionary = this.dictionaryRep.create(dictionary)
    this.dictionaryRep.save(newDictionary)

    return {}
  }

}
