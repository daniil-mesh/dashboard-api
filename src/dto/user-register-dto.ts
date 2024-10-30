import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDTO {
  @IsEmail()
  mail: string = '';

  @IsString()
  pass: string = '';

  @IsString()
  name: string = '';
}
