import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

import { Menu } from './modules/permissionAdm/menus/entities/menu.entity';

// 引入typeorm模块
import { TypeOrmModule } from '@nestjs/typeorm';
// 引入配置模块
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MenusModule } from './modules/permissionAdm/menus/menus.module';
import { MenuMeta } from './modules/permissionAdm/menus/entities/menu-meta.entity';
import { Permission } from './modules/permissionAdm/permission/entities/permission.entity';
import { Dictionary } from './modules/dictionary/entities/dictionary.entity';
import { DictionaryOptions } from './modules/dictionary/entities/dictionary-options.entity';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { ClsModule } from 'nestjs-cls';
import { UsersModule } from './modules/permissionAdm/user/users.module';
import { RolesModule } from './modules/permissionAdm/roles/roles.module';
import { User } from './modules/permissionAdm/user/entities/user.entity';
import { Role } from './modules/permissionAdm/roles/entities/role.entity';
import { PermissionModule } from './modules/permissionAdm/permission/permission.module';
import { CommonModule } from './modules/common/common.module';

// 当前环境
const NODE_DEV = process.env.NODE_ENV;

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
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
          entities: [Role, User, Menu, MenuMeta, Permission, Dictionary, DictionaryOptions],  // 数据表实体
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
    DictionaryModule,
    PermissionModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})

export class AppModule { }