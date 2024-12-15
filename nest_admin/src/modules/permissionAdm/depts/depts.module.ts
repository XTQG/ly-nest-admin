import { Module } from '@nestjs/common';
import { DeptsService } from './depts.service';
import { DeptsController } from './depts.controller';

@Module({
  controllers: [DeptsController],
  providers: [DeptsService],
})
export class DeptsModule {}
