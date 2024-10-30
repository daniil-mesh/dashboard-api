import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { Dependency } from '../../enums/dependency.js';
import { ILogger } from '../../interfaces/loggers/logger.js';
import { IPrismaService } from '../../interfaces/services/prisma-service.js';

@injectable()
export class PrismaService implements IPrismaService {
  private _client: PrismaClient;

  constructor(@inject(Dependency.ILogger) private logger: ILogger) {
    this._client = new PrismaClient();
  }

  get client(): PrismaClient {
    return this._client;
  }

  async connect(): Promise<void> {
    try {
      await this._client.$connect();
      this.logger.log('DB: connect success');
    } catch {
      this.logger.error('DB: connect error');
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this._client.$disconnect();
      this.logger.log('DB: disconnect success');
    } catch {
      this.logger.error('DB: connect error');
    }
  }
}
