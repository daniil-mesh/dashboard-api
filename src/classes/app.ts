import { Server } from 'http';
import express, { Express } from 'express';
import ILogger from '../interfaces/logger.js';
import UserController from './controllers/user-controller.js';

export default class App {
  app: Express;
  logger: ILogger;
  port: number;
  server?: Server;
  userController: UserController;

  constructor(port: number, logger: ILogger, userController: UserController) {
    this.app = express();
    this.logger = logger;
    this.port = port;
    this.userController = userController;
  }

  public async init(): Promise<void> {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server running at http://localhost:${this.port}/`);
  }

  private useRoutes(): void {
    this.app.use('/user', this.userController.router);
  }
}
