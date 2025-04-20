import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { CaptchaService } from './captcha.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService,CaptchaService],
  exports: [CommonService,CaptchaService]
})
export class CommonModule {}
