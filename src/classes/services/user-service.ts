import { injectable } from 'inversify';
import UserRegisterDTO from '../dto/user-register-dto.js';
import User from '../entity/user.js';
import UserLoginDTO from '../dto/user-login-dto.js';

@injectable()
export default class UserService {
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
