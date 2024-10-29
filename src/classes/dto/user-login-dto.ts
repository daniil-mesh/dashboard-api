import { IsEmail, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  mail: string = '';

  @IsString()
  pass: string = '';
}
