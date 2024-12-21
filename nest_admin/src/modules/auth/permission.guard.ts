import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { PER_META_KEY } from 'src/common/metaData/permissionMetaData.ts';
import { UsersService } from '../permissionAdm/user/users.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private readonly clsService: ClsService,
    private readonly userService: UsersService,
  ) {
  }

  @Inject(JwtService)

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 获取接口权限元数据
    const perMeta = this.reflector.getAllAndOverride<boolean>(PER_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果该接口没有设置元数据，那么就跳过权限校验，直接放行
    if (perMeta === undefined) {
      return true
    }

    // console.log(perMeta);

    const userId = this.clsService.get('userId')

    const userPermission = await this.userService.findUserPermissions(userId)

    if (!userPermission) {
      throw new ForbiddenException('用户不存在,请重新登录')
    }


    let permission = []
    userPermission.roles.forEach((role) => {
      permission = permission.concat(role.permission)
    })

    const hasPermission = permission.some((item) => {
      return item.value === perMeta
    })
    // console.log(hasPermission);

    if (!hasPermission) {
      throw new ForbiddenException('您没有访问该接口权限')
      // return Promise.resolve(false)
    }

    return Promise.resolve(true)
  }

}
