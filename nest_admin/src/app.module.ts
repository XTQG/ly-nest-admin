import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./modules/user/users.module";
import { AuthModule } from './modules/auth/auth.module';

import { Role } from './modules/roles/entities/role.entity';

import { User } from './modules/user/entities/user.entity';

import { Menu } from './modules/menus/entities/menu.entity';

// 引入typeorm模块
import { TypeOrmModule } from '@nestjs/typeorm';
// 引入配置模块
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MenusModule } from './modules/menus/menus.module';
import { MenuMeta } from './modules/menus/entities/menu-meta.entity';
import { RolesModule } from './modules/roles/roles.module';
import { Permission } from './modules/menus/entities/permission.entity';

// 当前环境
const NODE_DEV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.env.${NODE_DEV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql', // 数据库类型
          entities: [Role, User, Menu, MenuMeta, Permission],  // 数据表实体
          host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
          port: configService.get<number>('DB_PORT', 3306), // 端口号
          username: configService.get('DB_USER', 'root'),   // 用户名
          password: configService.get('DB_PASSWORD', '293598'), // 密码
          database: configService.get('DB_DATABASE', 'nest_admin'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
          synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
          autoLoadEntities: true, //自动加载实体
        }
      },
    }),
    UsersModule,
    AuthModule,
    MenusModule,
    RolesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }