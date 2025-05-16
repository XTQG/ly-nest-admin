import { Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { CommonService } from './common.service';
import { Public } from 'src/common/decorator/publicDecorator';
import { CaptchaService } from './captcha.service';
import { MulterFileInterceptor } from 'src/common/intercept/file.interceptor';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly captchaService: CaptchaService,
  ) { }

  @Public()
  @Post('upload')
  @MulterFileInterceptor({})
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { url: file.filename }
  }

  // 获取验证码图片
  @Public()
  @Get('getCaptchaImage')
  getCaptchaImage() {
    return this.captchaService.getCaptchaImage();
  }



}
