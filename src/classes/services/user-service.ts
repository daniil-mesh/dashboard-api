import { inject, injectable } from 'inversify';

import { IUserService } from '../../interfaces/services/user-service.js';
import { User } from '../entity/index.js';
import { UserLoginDTO, UserRegisterDTO } from '../dto/index.js';
import { DataType, Dependency } from '../../enums/index.js';
import { IConfigService } from '../../interfaces/index.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Dependency.IConfigService) private configService: IConfigService,
  ) {}

  public async register({
    mail,
    name,
    pass,
  }: UserRegisterDTO): Promise<User | null> {
    try {
      const user = new User(mail, name);
      const salt = this.configService.get('SALT', DataType.Number);
      await user.setPass(pass, salt);
      return user;
    } catch {
      return null;
    }
  }

  public login({ mail, pass }: UserLoginDTO): void {
    console.log(mail, pass);
  }
}
