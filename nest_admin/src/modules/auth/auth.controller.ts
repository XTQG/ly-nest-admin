import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/publicDecorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  // 登录
  @Post("login")
  async login(@Body() user) {
    return this.authService.login(user);
  }

  // 刷新token
  @Post("refreshToken")
  async refreshToken(@Body() token) {
    return this.authService.refreshToken(token);
  }

}
