import { Dependency } from '../enums/dependency.js';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import express, { Express } from 'express';
import IFilter from '../interfaces/exception-filter.js';
import ILogger from '../interfaces/logger.js';
import UserController from './controllers/user-controller.js';
import Config from '../_config/config.js';

@injectable()
export default class App {
  private express: Express;
  private port: number;
  private server?: Server;

  constructor(
    @inject(Dependency.IFilter) private filter: IFilter,
    @inject(Dependency.ILogger) private logger: ILogger,
    @inject(Dependency.UserController) private userController: UserController
  ) {
    this.express = express();
    this.port = Config.PORT;
  }

  public async init(): Promise<void> {
    this.useRoutes();
    this.useFilters();
    this.server = this.express.listen(this.port);
    this.logger.log(`Server running at http://localhost:${this.port}/`);
  }

  private useRoutes(): void {
    this.express.use('/user', this.userController.router);
  }

  private useFilters(): void {
    this.express.use(this.filter.catch.bind(this.filter));
  }
}
