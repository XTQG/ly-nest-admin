import { Like, Repository, UpdateResult } from "typeorm"
import { QueryListDto, ResponseListDto, SaveDto } from "./dto"
import { HttpException, Inject } from "@nestjs/common"
import { ClsService } from "nestjs-cls"

export class BaseService<T, K> {
  repository = null
  constructor(repository: Repository<T>) {
    this.repository = repository
  }

  @Inject(ClsService)
  private readonly clsService1: ClsService

  newData(data) {
    return this.repository.create(data)
  }

  // typeorm save 会保存关系，create 和 update 不会保存关系
  async save(dto: SaveDto<T>) {
    if (dto.id) {
      if (!dto.updateUser) {
        delete dto.createUser
        delete dto.createTime
        dto.updateUser = this.clsService1.get('userId')
      }
    } else {
      if (!dto.createUser) {
        delete dto.updateUser
        delete dto.updateTime
        const userId = this.clsService1.get('userId')
        dto.createUser = userId
      }
    }
    let data = this.repository.create(dto)
    await this.repository.save(data)
    return {}
  }

  async add(dto: SaveDto<T>) {
    delete dto.id
    if (!dto.createUser) {
      delete dto.updateUser
      const userId = this.clsService1.get('userId')
      dto.createUser = userId
    }
    const newData = this.repository.create(dto)
    this.save(newData)
    return {}
  }

  async update(dto: SaveDto<T>, userId = '') {
    if (!dto.id) throw new HttpException({ message: '数据不存在' }, 400);
    if (!userId) {
      delete dto.createUser
      const userId1 = this.clsService1.get('userId')
      dto.updateUser = userId1
    }
    const data = this.repository.create(dto)
    this.save(data)
    return {}
  }

  async remove(ids: string[] | string, updateUser?: string): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    return this.repository.update(ids, { isDeleted: 1, updateUser })
  }

  async delete(ids: string[] | string, updateUser?: string): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    return this.repository.delete(ids)
  }

  // 列表查询
  async list(
    query: QueryListDto = {},
    cb?,
  ): Promise<ResponseListDto<T>> {
    let { currentPage = 1, pageSize = 10, where = {}, andWhere = null, leftJoinAndSelect = null } = query

    // 计算 skip 和 take
    const skip = (currentPage - 1) * pageSize;
    const take = pageSize;

    let queryBuilder = await this.repository.createQueryBuilder("entity").where({ ...where, isDeleted: 0 })

    if (leftJoinAndSelect) {
      if (Array.isArray(leftJoinAndSelect)) {
        for (const item of leftJoinAndSelect) {
          await this.leftJoinAndSelectFn(item, queryBuilder)
        }
      } else {
        await this.leftJoinAndSelectFn(leftJoinAndSelect, queryBuilder)
      }

      if (andWhere) {
        for (const item of andWhere) {
          await queryBuilder.andWhere(item[0], item[1])
        }
      }
    }

    // await queryBuilder.andWhere({ ...where, isDeleted: 0 })

    const [data, total] = await queryBuilder.skip(skip).take(take).getManyAndCount()
    // console.log(data);
    return { total, data: data }
  }

  // 查询所有
  async queryAll(query) {
    const { where, leftJoinAndSelect } = query
    let queryBuilder = await this.repository.createQueryBuilder("entity").andWhere({ ...where, isDeleted: 0 })
    if (leftJoinAndSelect) {
      if (Array.isArray(leftJoinAndSelect)) {
        for (const item of leftJoinAndSelect) {
          this.leftJoinAndSelectFn(item, queryBuilder)
        }
      } else {
        this.leftJoinAndSelectFn(leftJoinAndSelect, queryBuilder)
      }
    }
    return await queryBuilder.getMany()
  }


  leftJoinAndSelectFn = async (leftJoinAndSelect, queryBuilder) => {
    const { entity, alias, condition } = leftJoinAndSelect
    if (entity && alias && condition) {
      await queryBuilder.leftJoinAndSelect(entity, alias, condition)
    } else if (typeof entity == 'string' && entity && alias && !condition) {
      await queryBuilder.leftJoinAndSelect(entity, alias)
    } else if (typeof entity == 'string' && entity) {
      await queryBuilder.leftJoinAndSelect(entity)
    } else {
      throw new HttpException('leftJoinAndSelect 参数错误，服务器内部错误', 500);
    }
  }

  // 单条查询统一公用接口，禁止子类重写
  async sqlOne(query): Promise<any | null> {
    if (!query) return null
    let isEmpty = true

    const { where, leftJoinAndSelect } = query

    if (!where) {
      return null
    } else {
      for (const key in where) {
        if (where[key]) {
          isEmpty = false
          break
        }
      }
    }
    if (isEmpty) return null
    let queryBuilder = await this.repository.createQueryBuilder("entity").andWhere({ ...where, isDeleted: 0 })

    if (leftJoinAndSelect) {
      if (Array.isArray(leftJoinAndSelect)) {
        for (const item of leftJoinAndSelect) {
          this.leftJoinAndSelectFn(item, queryBuilder)
        }
      } else {
        this.leftJoinAndSelectFn(leftJoinAndSelect, queryBuilder)
      }
    }

    return queryBuilder.getOne()
  }


  // 模糊匹配
  sqlLike(value) {
    // value.replace(/%/g, '\\%')：将字符串中的 % 替换为 \%，以防止 % 被当作通配符。
    // value.replace(/_/g, '\\_')：将字符串中的 _ 替换为 \_，以防止 _ 被当作通配符。
    // Like(%...%)：使用 Like 函数进行模糊匹配，% 表示任意字符序列，_ 表示任意单个字符。
    return value == undefined ? undefined : Like(`%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`)
  }

}