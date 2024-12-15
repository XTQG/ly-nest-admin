import { IsArray, IsOptional, IsString } from "class-validator";

export class QueryMenuDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  ids?: string[];
}