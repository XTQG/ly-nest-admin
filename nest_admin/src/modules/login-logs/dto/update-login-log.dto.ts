import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginLogDto } from './create-login-log.dto';

export class UpdateLoginLogDto extends PartialType(CreateLoginLogDto) {}
