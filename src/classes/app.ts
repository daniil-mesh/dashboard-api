import { inject, injectable } from 'inversify';
import { Server } from 'http';
import BodyParser from 'body-parser';
import express, { Express } from 'express';

import { DataType } from '../enums/data-type.js';
import { Dependency } from '../enums/dependency.js';
import { IApp } from '../interfaces/app.js';
import { IConfigService } from '../interfaces/services/config-service.js';
import { IFilter } from '../interfaces/errors/filter.js';
import { ILogger } from '../interfaces/loggers/logger.js';
import { IPrismaService } from '../interfaces/services/prisma-service.js';
import { IUserController } from '../interfaces/controllers/user-controller.js';

@injectable()
export default class App implements IApp {
  private express: Express;
  private port: number;
  private server?: Server;

  constructor(
    @inject(Dependency.IConfigService) private configService: IConfigService,
    @inject(Dependency.IFilter) private filter: IFilter,
    @inject(Dependency.ILogger) private logger: ILogger,
    @inject(Dependency.IPrismaService) private prismaService: IPrismaService,
    @inject(Dependency.IUserController) private userController: IUserController,
  ) {
    this.express = express();
    this.port = this.configService.get('PORT', DataType.Number);
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useFilters();
    await this.prismaService.connect();
    this.server = this.express.listen(this.port);
    this.logger.log(`APP: server running at http://localhost:${this.port}/`);
  }

  private useMiddleware(): void {
    this.express.use(BodyParser.json());
  }

  private useRoutes(): void {
    this.express.use(this.userController.path, this.userController.router);
  }

  private useFilters(): void {
    this.express.use(this.filter.catch.bind(this.filter));
  }
}
