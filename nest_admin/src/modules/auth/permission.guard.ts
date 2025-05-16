import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException, Controller } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { PER_META_KEY, PER_PUBLIC_KEY } from 'src/common/metaData/permissionMetaData.ts';
import { UsersService } from '../permissionAdm/user/users.service';
import { IS_PUBLIC_KEY } from 'src/common/decorator/publicDecorator';

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
    const AllPerMeta = this.reflector.getAllAndOverride<boolean>(PER_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // 这个是给已经登录的用户通行的
    const isPerPublic = this.reflector.get(PER_PUBLIC_KEY, context.getHandler());
    if (isPublic || isPerPublic) {
      return true;
    }

    const controllerMeta = this.reflector.get(PER_META_KEY, context.getClass())
    const methodMeta = this.reflector.get(PER_META_KEY, context.getHandler())

    const perMeta = controllerMeta + "_" + methodMeta

    // console.log(controllerMeta, methodMeta, AllPerMeta);

    // 如果该接口没有设置元数据，那么就跳过权限校验，直接放行
    if (AllPerMeta === undefined) {
      return true
    }

    // 关闭接口权限校验
    // return true

    // console.log(perMeta);

    const userId = this.clsService.get('userId')
    const rolePermission = await this.userService.findUserRolePermissions(userId)
    // console.log(permission);

    if (!rolePermission) {
      throw new ForbiddenException('用户不存在,请重新登录')
    }

    let permission = []
    rolePermission.forEach((role) => {
      permission = permission.concat(role.permission)
    })

    // console.log(permission);

    const hasPermission = permission.some((item) => {
      return item.value === perMeta
    })

    // console.log(hasPermission,perMeta);

    if (!hasPermission) {
      throw new ForbiddenException('您没有访问该接口权限')
      // return Promise.resolve(false)
    }

    return Promise.resolve(true)
  }

}
