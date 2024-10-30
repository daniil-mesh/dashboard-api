import { injectable, inject } from 'inversify';
import { UserModel } from '@prisma/client';

import { Dependency } from '../../enums/dependency.js';
import { IPrismaService } from '../../interfaces/services/prisma-service.js';
import { IUserRepository } from '../../interfaces/repositories/user-repository.js';
import { User } from '../entity/user.js';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(Dependency.IPrismaService) private prismaService: IPrismaService,
  ) {}

  create({ mail, pass, name }: User): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: {
        mail,
        pass,
        name,
      },
    });
  }

  find(mail: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({ where: { mail } });
  }
}
