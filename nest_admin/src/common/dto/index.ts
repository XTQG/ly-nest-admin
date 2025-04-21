export type SaveDto<T> = {
  [index: string]: any
}

export type QueryOneDto = {
  id?: string
  [index: string]: any
}

export type QueryListDto = {
  pageNum?: number // 当前页码 从1开始 默认1
  pageSize?: number // 每页条数 默认10
  [index: string]: any
}

export type ResponseListDto<T> = {
  total?: number // 总条数
  data: T[]
  [index: string]: any
}