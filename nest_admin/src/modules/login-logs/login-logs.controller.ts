import { Controller, Get, Query } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { BaseController } from 'src/common/BaseController';
import { customLoginLogMeta, loginLogBaseMeta } from './meta';
import { PermissionMeta } from 'src/common/metaData/permissionMetaData.ts';
import { In } from 'typeorm';


@PermissionMeta(loginLogBaseMeta.value)
@Controller(loginLogBaseMeta.value)
export class LoginLogsController extends BaseController<any, LoginLogsService> {
  constructor(private readonly loginLogsService: LoginLogsService) {
    super(loginLogsService, loginLogBaseMeta.value)
  }

  // 分页查询
  @PermissionMeta(customLoginLogMeta.list.value)
  @Get('list')
  async queryList(@Query() query: any) {
    const { account = null,
      address = null,
      isSuccess = null,
      msg = null } = query

    // console.log(query);

    const where = {
      isSuccess: isSuccess != 2 ? isSuccess : In([0, 1]),
      account: this.service.sqlLike(account),
      address: this.service.sqlLike(address),
      msg: this.service.sqlLike(msg),
    }
    return this.list({ ...query, where })
  }

}
