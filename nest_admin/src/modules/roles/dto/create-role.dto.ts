import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  name: string

  @IsOptional()
  remark: string

  @IsOptional()
  @IsArray()
  menus: string[]
}