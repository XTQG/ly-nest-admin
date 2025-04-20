import { Like, Repository, UpdateResult } from "typeorm"
import { QueryListDto, ResponseListDto, SaveDto } from "./dto"
import { HttpException } from "@nestjs/common"

export class BaseService<T, K> {
  repository = null
  constructor(repository: Repository<T>) {
    this.repository = repository
  }

  // typeorm save 会保存关系，create 和 update 不会保存关系
  async save(dto: SaveDto<T>) {
    let data = this.repository.create(dto)
    data = await this.repository.save(data)
  }

  async add(dto: SaveDto<T>) {
    delete dto.id
    return this.save(dto)
  }

  async update(dto: SaveDto<T>) {
    if (!dto.id) throw new HttpException({ message: '数据不存在' }, 400);
    return this.save(dto)
  }

  async remove(ids: string[] | string, updateUser?: string): Promise<UpdateResult> {
    if (typeof ids == 'string') {
      ids = ids.split(',')
    }
    return this.repository.update(ids, { isDelete: 1, updateUser })
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
    cb?: (data: any[]) => [] | void,
  ): Promise<ResponseListDto<T>> {
    let { currentPage = 1, pageSize = 10, where = {} } = query

    // 计算 skip 和 take
    const skip = (currentPage - 1) * pageSize;
    const take = pageSize;

    let queryBuilder = await this.repository.createQueryBuilder("entity").andWhere({ ...where })

    // const [data, total] = queryBuilder.skip(skip).take(take).getManyAndCount()

    // return { total: total, data: cb?.(data) || data }

    const [data, total] = await queryBuilder.skip(skip).take(take).getManyAndCount()
    // console.log(data);
    return { total, data: data }
  }

  // 模糊匹配
  sqlLike(value) {
    // value.replace(/%/g, '\\%')：将字符串中的 % 替换为 \%，以防止 % 被当作通配符。
    // value.replace(/_/g, '\\_')：将字符串中的 _ 替换为 \_，以防止 _ 被当作通配符。
    // Like(%...%)：使用 Like 函数进行模糊匹配，% 表示任意字符序列，_ 表示任意单个字符。
    return value == undefined ? undefined : Like(`%${value.replace(/%/g, '\\%').replace(/_/g, '\\_')}%`)
  }

}