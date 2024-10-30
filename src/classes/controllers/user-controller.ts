import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from './base-controller.js';
import { Dependency } from '../../enums/dependency.js';
import { HttpError } from '../error/http-error.js';
import { ILogger } from '../../interfaces/loggers/logger.js';
import { IUserController } from '../../interfaces/controllers/user-controller.js';
import { IUserService } from '../../interfaces/services/user-service.js';
import { RequestMethod } from '../../enums/request-method.js';
import { UserLoginDTO } from '../../dto/user-login-dto.js';
import { UserPath } from '../../enums/user-path.js';
import { UserRegisterDTO } from '../../dto/user-register-dto.js';
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

  public async login(
    { body }: Request<object, object, UserLoginDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log(`${this._path.toUpperCase()}: login request`, body);
    const user = await this.service.login(body);
    if (!user) {
      return next(new HttpError(401, `${this._path}: login error`));
    }
    this.ok(res, `${this._path}: login success`);
  }

  public async register(
    { body }: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log(`${this._path.toUpperCase()}: register request`, body);
    const user = await this.service.register(body);
    if (!user) {
      return next(new HttpError(422, `${this._path}: register error`));
    }
    this.created(res, `${this._path}: register success`);
  }
}
