import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  roles: string[];
}
