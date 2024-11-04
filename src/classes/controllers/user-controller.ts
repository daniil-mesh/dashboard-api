import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { BaseController } from './base-controller.js';
import { Dependency } from '../../enums/dependency.js';
import { HttpError } from '../error/http-error.js';
import { IConfigService } from '../../interfaces/services/config-service.js';
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
    @inject(Dependency.IConfigService) private configService: IConfigService,
    @inject(Dependency.ILogger) logger: ILogger,
    @inject(Dependency.IUserService) private userService: IUserService,
  ) {
    super(logger);
    this.bindRoutes(this.path, [
      {
        path: UserPath.Info,
        method: RequestMethod.Get,
        func: this.info,
        middlewares: [],
      },
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
    const user = await this.userService.login(body);
    if (!user) {
      return next(new HttpError(401, `${this._path}: login error`));
    }
    const jwt = await this.signJWT(body.mail, this.configService.get('SECRET'));
    this.ok(res, { jwt });
  }

  public async info(
    { mail }: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    const user = await this.userService.info(mail);
    this.ok(res, { id: user.id, mail: user.mail });
  }

  public async register(
    { body }: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    this.logger.log(`${this._path.toUpperCase()}: register request`, body);
    const user = await this.userService.register(body);
    if (!user) {
      return next(new HttpError(422, `${this._path}: register error`));
    }
    this.created(res, `${this._path}: register success`);
  }

  private signJWT(mail: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(
        { mail, iat: Math.floor(Date.now() / 1000) },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
