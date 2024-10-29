import { NextFunction, Request, Response } from 'express';

import { IController } from '../index.js';
import { UserLoginDTO, UserRegisterDTO } from '../../classes/dto/index.js';

export interface IUserController extends IController {
  login(
    req: Request<object, object, UserLoginDTO>,
    res: Response,
    next: NextFunction,
  ): void;

  register(
    { body }: Request<object, object, UserRegisterDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
