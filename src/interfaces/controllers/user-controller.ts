import { NextFunction, Request, Response } from 'express';

import { IController } from './controller.js';
import { UserLoginDTO } from '../../dto/user-login-dto.js';
import { UserRegisterDTO } from '../../dto/user-register-dto.js';

export interface IUserController extends IController {
  login(
    req: Request<object, object, UserLoginDTO>,
    res: Response,
    next: NextFunction,
  ): void;

  register(
    req: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  info(
    req: Request<object, object, UserLoginDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
