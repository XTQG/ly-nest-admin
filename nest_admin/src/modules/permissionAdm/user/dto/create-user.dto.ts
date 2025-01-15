import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "账号不能为空" })
  account: string;

  @IsString()
  @IsNotEmpty({ message: "密码不能为空" })
  password: string;

  @IsOptional()
  @IsArray()
  roles: string[];
}
