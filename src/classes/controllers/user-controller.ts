import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from './index.js';
import { Dependency, RequestMethod, UserPath } from '../../enums/index.js';
import { HttpError } from '../error/index.js';
import {
  ILogger,
  IUserController,
  IUserService,
} from '../../interfaces/index.js';
import { UserLoginDTO, UserRegisterDTO } from '../dto/index.js';
import { ValidateMiddleware } from '../middlewares/validate-middleware.js';

@injectable()
export class UserController extends BaseController implements IUserController {
  protected _path: string = 'user';

  constructor(
    @inject(Dependency.ILogger) logger: ILogger,
    @inject(Dependency.IUserService) private service: IUserService,
  ) {
    super(logger);
    this.bindRoutes(this.path, [
      {
        path: UserPath.Login,
        method: RequestMethod.Post,
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDTO, logger)],
      },
      {
        path: UserPath.Register,
        method: RequestMethod.Post,
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDTO, logger)],
      },
    ]);
  }

  public login(
    { body }: Request<object, object, UserLoginDTO>,
    res: Response,
    _next: NextFunction,
  ): void {
    this.logger.log(`${this._path}: login request`, body);
    this.service.login(body);
    this.ok(res, `${this._path}: login success`);
  }

  public async register(
    { body }: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log(`${this._path}: register request`, body);
    const user = await this.service.register(body);
    if (!user) {
      return next(new HttpError(422, `${this._path}: register error`));
    }
    this.created(res, `${this._path}: register success`);
  }
}
