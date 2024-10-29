import { inject, injectable } from 'inversify';
import { Server } from 'http';
import BodyParser from 'body-parser';
import express, { Express } from 'express';

import { DataType, Dependency } from '../enums/index.js';
import {
  IApp,
  IConfigService,
  IFilter,
  ILogger,
  IUserController,
} from '../interfaces/index.js';

@injectable()
export default class App implements IApp {
  private express: Express;
  private port: number;
  private server?: Server;

  constructor(
    @inject(Dependency.IFilter) private filter: IFilter,
    @inject(Dependency.ILogger) private logger: ILogger,
    @inject(Dependency.IUserController) private userController: IUserController,
    @inject(Dependency.IConfigService) private configService: IConfigService,
  ) {
    this.express = express();
    this.port = this.configService.get('PORT', DataType.Number);
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useFilters();
    this.server = this.express.listen(this.port);
    this.logger.log(`Server running at http://localhost:${this.port}/`);
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
