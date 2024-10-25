import bcrypt from 'bcryptjs';
import Config from '../../_config/config.js';

export default class User {
  private _pass?: string;

  constructor(
    private _mail: string,
    private _name: string,
  ) {}

  get email(): string {
    return this._mail;
  }

  get name(): string {
    return this._name;
  }

  public async getPass(): Promise<string> {
    return this._pass ?? '';
  }

  public async setPass(pass: string): Promise<void> {
    this._pass = await bcrypt.hash(pass, Config.SALT);
  }
}
