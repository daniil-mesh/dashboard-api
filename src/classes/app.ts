import { Dependency } from '../enums/dependency.js';
import { inject, injectable } from 'inversify';
import BodyParser from 'body-parser';
import { Server } from 'http';
import Config from '../_config/config.js';
import express, { Express } from 'express';
import ILogger from '../interfaces/logger.js';
import UserController from './controllers/user-controller.js';
import ExceptionFilter from './filters/exception-filter.js';

@injectable()
export default class App {
  private express: Express;
  private port: number;
  private server?: Server;

  constructor(
    @inject(Dependency.ExceptionFilter) private filter: ExceptionFilter,
    @inject(Dependency.ILogger) private logger: ILogger,
    @inject(Dependency.UserController) private userController: UserController,
  ) {
    this.express = express();
    this.port = Config.PORT;
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
