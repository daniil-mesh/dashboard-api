import { NextFunction, Request, Response } from 'express';
import { RequestMethod } from '../../enums/request-method.js';
import { UserPath } from '../../enums/request-path.js';
import BaseController from './base-controller.js';
import ILogger from '../../interfaces/logger.js';

export default class UserController extends BaseController {
  constructor(logger: ILogger) {
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
    this.ok(res, 'login');
  }

  public register(req: Request, res: Response, next: NextFunction): void {
    this.created(res, 'register');
  }
}
