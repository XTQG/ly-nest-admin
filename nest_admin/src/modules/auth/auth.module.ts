import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwtAuth.guard';
import { MenusModule } from '../permissionAdm/menus/menus.module';
import { ClsModule } from 'nestjs-cls';
import { UsersModule } from '../permissionAdm/user/users.module';
import { User } from '../permissionAdm/user/entities/user.entity';
import { PermissionGuard } from './permission.guard';
import { CommonModule } from '../common/common.module';
import { LoginLogsModule } from '../login-logs/login-logs.module';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  global: true,
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get("JWT_SECRET", "test123456"),
      signOptions: { expiresIn: "4h" },
    };
  },
})

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    jwtModule,
    MenusModule,
    ClsModule,
    CommonModule,
    LoginLogsModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    }
  ],
})
export class AuthModule { }
