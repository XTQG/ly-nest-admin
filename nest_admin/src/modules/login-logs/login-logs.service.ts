import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/BaseService';
import { LoginLog } from './entities/login-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBrowser, getSystem } from 'src/common/utils/comon';

@Injectable()
export class LoginLogsService extends BaseService<LoginLog, LoginLogsService> {

  constructor(
    @InjectRepository(LoginLog)
    private readonly loginLogRepository: Repository<LoginLog>
  ) {
    super(loginLogRepository)
  }

  async createLogs(req, dto) {
    const loginLog: any = {
      // account: dto.account,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      // address: dto.address,
      browser: getBrowser(req.headers['user-agent']),
      os: getSystem(req.headers['user-agent']),
      // isSuccess: dto.isSuccess,
      // msg: dto.msg,
      ...dto
    }

    if (['::1'].includes(loginLog.ip)) {
      loginLog.address = '本地'
    }
    // console.log(loginLog);

    return await this.add({ ...loginLog })
  }



}
