import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { Public } from 'src/common/decorator/publicDecorator';
import { CaptchaService } from './captcha.service';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly captchaService: CaptchaService,
  ) { }

  @Public()
  @Get('getCaptchaImage')
  getCaptchaImage() {
    return this.captchaService.getCaptchaImage();
  }

  @Post()
  create(@Body() createCommonDto: CreateCommonDto) {
    return this.commonService.create(createCommonDto);
  }


}
