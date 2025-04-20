import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginLogsService } from './login-logs.service';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { UpdateLoginLogDto } from './dto/update-login-log.dto';

@Controller('login-logs')
export class LoginLogsController {
  constructor(private readonly loginLogsService: LoginLogsService) {}

  
}
