import { Dependency } from '../../enums/dependency.js';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { RequestMethod } from '../../enums/request-method.js';
import { UserPath } from '../../enums/request-path.js';
import BaseController from './base-controller.js';
import ILogger from '../../interfaces/logger.js';
import UserLoginDTO from '../dto/user-login-dto.js';
import UserRegisterDTO from '../dto/user-register-dto.js';
import UserService from '../services/user-service.js';
import HttpError from '../errors/http-error.js';

@injectable()
export default class UserController extends BaseController {
  protected _path: string = 'user';

  constructor(
    @inject(Dependency.ILogger) logger: ILogger,
    @inject(Dependency.UserService) private service: UserService,
  ) {
    super(logger);
    this.bindRoutes(this.path, [
      { path: UserPath.Login, method: RequestMethod.Post, func: this.login },
      {
        path: UserPath.Register,
        method: RequestMethod.Post,
        func: this.register,
      },
    ]);
  }

  public login(
    req: Request<object, object, UserLoginDTO>,
    res: Response,
    _next: NextFunction,
  ): void {
    this.logger.log(`${this._path}: login request`, req.body);
    this.service.login(req.body);
    this.ok(res, `${this._path}: login success`);
  }

  public async register(
    req: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log(`${this._path}: register request`, req.body);
    const user = await this.service.register(req.body);
    if (!user) {
      return next(new HttpError(422, `${this._path}: register error`));
    }
    this.created(res, `${this._path}: register success`);
  }
}
