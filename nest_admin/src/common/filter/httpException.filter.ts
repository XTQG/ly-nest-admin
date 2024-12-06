import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log(exception);
    const ctx = host.switchToHttp();// 获取请求上下文
    const response = ctx.getResponse();// 获取 response 对象
    const request = ctx.getRequest();// 获取 request 对象
    // const status = exception.getStatus(); // 获取异常的状态码

    let msg = exception.message;
    // console.log(exception);

    // const errRes: any = exception?.getResponse()
    // console.log(errRes);

    // if (errRes) {
    //   msg = errRes?.msg
    // }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
      msg = "服务器异常"
    }
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: msg,
    });
  }
}
