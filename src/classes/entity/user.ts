import bcrypt from 'bcryptjs';

export class User {
  private _pass?: string;

  constructor(
    private _mail: string,
    private _name: string,
  ) {}

  get mail(): string {
    return this._mail;
  }

  get name(): string {
    return this._name;
  }

  get pass(): string {
    return this._pass ?? '';
  }

  public async setPass(pass: string, salt: number): Promise<void> {
    this._pass = await bcrypt.hash(pass, salt);
  }

  public static async comparePass(
    pass: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }
}
