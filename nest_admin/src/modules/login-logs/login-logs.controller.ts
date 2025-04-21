import { Controller } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { BaseController } from 'src/common/BaseController';
import { loginLogBaseMeta } from './meta';

@Controller(loginLogBaseMeta.value)
export class LoginLogsController extends BaseController<any, LoginLogsService> {
  constructor(private readonly loginLogsService: LoginLogsService) {
    super(loginLogsService, loginLogBaseMeta.value)
  }


}
