import { inject, injectable } from 'inversify';

import { DataType } from '../../enums/data-type.js';
import { Dependency } from '../../enums/dependency.js';
import { IConfigService } from '../../interfaces/services/config-service.js';
import { IUserRepository } from '../../interfaces/repositories/user-repository.js';
import { IUserService } from '../../interfaces/services/user-service.js';
import { User } from '../entity/user.js';
import { UserLoginDTO } from '../../dto/user-login-dto.js';
import { UserRegisterDTO } from '../../dto/user-register-dto.js';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Dependency.IConfigService) private configService: IConfigService,
    @inject(Dependency.IUserRepository) private userRepository: IUserRepository,
  ) {}

  public async info(mail: string): Promise<UserModel> {
    return (await this.userRepository.find(mail)) as UserModel;
  }

  public async login({ mail, pass }: UserLoginDTO): Promise<UserModel | null> {
    const existedUser = await this.userRepository.find(mail);
    if (!existedUser || !(await User.comparePass(pass, existedUser.pass))) {
      return null;
    }
    return existedUser;
  }

  public async register({
    mail,
    name,
    pass,
  }: UserRegisterDTO): Promise<UserModel | null> {
    try {
      const existedUser = await this.userRepository.find(mail);
      if (existedUser) {
        return null;
      }

      const user = new User(mail, name);
      const salt = this.configService.get('SALT', DataType.Number);
      await user.setPass(pass, salt);
      return this.userRepository.create(user);
    } catch {
      return null;
    }
  }
}
