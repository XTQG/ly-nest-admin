import { Body, Get, HttpException, Inject, Post, Query } from "@nestjs/common"
import { ClsService } from "nestjs-cls"
import { QueryListDto, ResponseListDto } from "./dto"
import { PermissionMeta } from "./metaData/permissionMetaData.ts"

export class BaseController<T, K> {

  controllerUrl: string;
  service = null
  constructor(service: K, controllerUrl: string) {
    this.service = service
    // this.controllerUrl = controllerUrl
    this.controllerUrl = controllerUrl; // 初始化实例属性
  }

  @Inject(ClsService)
  private readonly clsService: ClsService

  // 新增或者更新
  @PermissionMeta((this as any).controllerUrl + '_save')
  @Post('save')
  async save(@Body() body) {
    const userId = this.clsService.get('userId')
    const { id } = body
    if (id) {
      delete body.createUser
      delete body.createTime
      body.updateUser = userId
    } else {
      delete body.updateUser
      delete body.updateTime
      body.createUser = userId
    }
    return await this.service.save(body)
  }

  @PermissionMeta((this as any).controllerUrl + '_add')
  @Post('add')
  async add(@Body() body) {
    delete body.updateUser
    const userId = this.clsService.get('userId')
    body.createUser = userId
    return this.service.add(body)
  }

  @PermissionMeta((this as any).controllerUrl + '_update')
  @Post('update')
  async update(@Body() body) {
    delete body.createUser
    const userId = this.clsService.get('userId')
    body.updateUser = userId
    return this.service.update(body)
  }



  // 逻辑删除
  @PermissionMeta((this as any).controllerUrl + '_remove')
  @Get('remove')
  async getRemove(@Query('id') id) {
    const userId = this.clsService.get('userId')
    return this.service.remove(id, userId)
  }

  // 物理删除
  @PermissionMeta((this as any).controllerUrl + '_delete')
  @Get('delete')
  async getDel(@Query('id') id) {
    const userId = this.clsService.get('userId')
    return this.service.delete(id, userId)
  }

  // 批量逻辑删除
  @PermissionMeta((this as any).controllerUrl + '_removeBatch')
  @Post('remove-batch')
  async postRemove(@Body('ids') ids: string) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('ids 参数不能为空且必须是数组', 400);
    }
    const userId = this.clsService.get('userId')
    return this.service.remove(ids, userId)
  }

  // 批量物理删除
  @PermissionMeta((this as any).controllerUrl + '_deleteBatch')
  @Post('delete-batch')
  async postDelete(@Body('ids') ids: string) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('ids 参数不能为空且必须是数组', 400);
    }
    const userId = this.clsService.get('userId')
    return this.service.delete(ids, userId)
  }

  // 分页查询
  @PermissionMeta((this as any).controllerUrl + '_list')
  @Get('list')
  async list(@Query() query: QueryListDto): Promise<ResponseListDto<T> | T[]> {
    query.currentPage ??= 1
    query.pageSize ??= 10
    return this.service.list(query)
  }

}