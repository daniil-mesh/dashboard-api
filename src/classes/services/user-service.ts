import { injectable } from 'inversify';

import { UserLoginDTO, UserRegisterDTO } from '../dto/index.js';
import { User } from '../entity/index.js';

@injectable()
export class UserService {
  public async register({
    mail,
    name,
    pass,
  }: UserRegisterDTO): Promise<User | null> {
    try {
      const user = new User(mail, name);
      await user.setPass(pass);
      return user;
    } catch {
      return null;
    }
  }

  public login({ mail, pass }: UserLoginDTO): void {
    console.log(mail, pass);
  }
}
