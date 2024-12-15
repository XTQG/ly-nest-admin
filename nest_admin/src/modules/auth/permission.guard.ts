import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { PER_META_KEY } from 'src/common/metaData/permissionMetaData.ts';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private reflector: Reflector, private readonly clsService: ClsService) {
  }

  @Inject(JwtService)

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取接口权限元数据
    const perMeta = this.reflector.getAllAndOverride<boolean>(PER_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果该接口没有设置元数据，那么就跳过权限校验，直接放行
    if (perMeta === undefined) {
      return true
    }
    const userId = this.clsService.get('userId')
    // console.log(userId);
    return true
  }

}
