import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SUCCESS_RESPONSE } from '../type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SUCCESS_RESPONSE> {
    // console.log(context);

    // 指向的控制器
    // console.log(context.getClass());

    // 指向的方法
    // console.log(context.getHandler());

    return next.handle().pipe(map(value => {
      // console.log("响应数据", value);
      return {
        data: value,
        code: 200,
        msg: '操作成功',
      };
    }));
  }
}
