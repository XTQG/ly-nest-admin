import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorator/publicDecorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private reflector: Reflector, private readonly clsService: ClsService) {
  }

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('未添加token');
    }
    const bearer = authorization.split(' ');
    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录 token 错误');
    }
    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      // 设置用户ID到cls中
      this.clsService.set('userId', info.id);

      return true;
    } catch (error) {
      throw new UnauthorizedException('登录 token 错误,请重新登录');
    }

  }

}
