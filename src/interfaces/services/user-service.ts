import { UserModel } from '@prisma/client';
import { UserLoginDTO } from '../../dto/user-login-dto.js';
import { UserRegisterDTO } from '../../dto/user-register-dto.js';

export interface IUserService {
  register(userRegisterDTO: UserRegisterDTO): Promise<UserModel | null>;

  login(userLoginDTO: UserLoginDTO): Promise<UserModel | null>;
}
