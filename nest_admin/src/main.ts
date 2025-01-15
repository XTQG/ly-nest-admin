import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { ResponseInterceptor } from './common/intercept/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000', // 允许的源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
};

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 解决跨域问题
  app.enableCors(corsOptions);

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局管道
  app.useGlobalPipes(new ValidationPipe({
    // transform: true, // 自动将 DTO 转换为类实例
    // whitelist: true, // 忽略 DTO 中未定义的属性
    // forbidNonWhitelisted: true, // 禁止未定义的属性
  }));

  // app.setGlobalPrefix('api'); // 设置全局路由前缀

  await app.listen(3001, () => {
    console.log("3001 端口的服务器已开启");
    console.info("接口文档:  http://localhost:3001/docs");
  });
}
bootstrap();
