import { Controller } from '@nestjs/common';
import { DeptsService } from './depts.service';

@Controller('depts')
export class DeptsController {
  constructor(private readonly deptsService: DeptsService) {}
}
