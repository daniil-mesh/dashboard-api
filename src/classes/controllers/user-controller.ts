import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { RequestMethod } from '../../enums/request-method.js';
import { UserPath } from '../../enums/request-path.js';
import BaseController from './base-controller.js';
import ILogger from '../../interfaces/logger.js';
import { Dependency } from '../../enums/dependency.js';

@injectable()
export default class UserController extends BaseController {
  constructor(@inject(Dependency.ILogger) logger: ILogger) {
    super(logger);
    this.bindRoutes([
      { path: UserPath.Login, method: RequestMethod.Post, func: this.login },
      {
        path: UserPath.Register,
        method: RequestMethod.Post,
        func: this.register,
      },
    ]);
  }

  public login(req: Request, res: Response, next: NextFunction): void {
    this.logger.log('user: login request');
    this.ok(res, 'login');
  }

  public register(req: Request, res: Response, next: NextFunction): void {
    this.logger.log('user: register request');
    this.created(res, 'register');
  }
}
