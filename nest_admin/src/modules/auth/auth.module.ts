import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwtAuth.guard';
import { MenusModule } from '../menus/menus.module';

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
  ],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AuthModule { }
