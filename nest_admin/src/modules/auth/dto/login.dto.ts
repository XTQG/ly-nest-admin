import { IsNotEmpty, Length, Matches } from "class-validator";


export class LoginDto {

  @Length(1, 50, { message: '用户名长度必须在3到50个字符之间' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @Matches(/^\w{6,9}$/, {
    message: '密码为字母，数字，长度在6 - 9位之间',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;


  @IsNotEmpty({ message: '验证码不能为空' })
  code: string;


  @IsNotEmpty({ message: 'uuid不能为空' })
  uuid: string;

}