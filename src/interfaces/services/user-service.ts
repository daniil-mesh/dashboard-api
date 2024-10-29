import { UserLoginDTO, UserRegisterDTO } from '../../classes/dto/index.js';
import { User } from '../../classes/entity/index.js';

export interface IUserService {
  register(userRegisterDTO: UserRegisterDTO): Promise<User | null>;

  login(userLoginDTO: UserLoginDTO): void;
}
