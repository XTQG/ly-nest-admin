import { IsNumber, IsOptional, IsString } from "class-validator";
import { Menu } from "../entities/menu.entity";
import { MenuMeta } from "../entities/menu-meta.entity";

export class CreateMenuDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  desc: string

  @IsString()
  @IsOptional()
  path: string

  @IsString()
  @IsOptional()
  component: string

  meta: MenuMeta

  @IsOptional()
  redirect: string

  @IsString()
  @IsOptional()
  parentId: string

  @IsOptional()
  isHidden: number

  @IsOptional()
  parent: Menu

}