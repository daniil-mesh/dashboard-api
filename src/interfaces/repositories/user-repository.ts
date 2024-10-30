import { UserModel } from '@prisma/client';

import { User } from '../../classes/entity/user.js';

export interface IUserRepository {
  create: (user: User) => Promise<UserModel>;

  find: (mail: string) => Promise<UserModel | null>;
}
