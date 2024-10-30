import { NextFunction, Request, Response, Router } from 'express';

import { IMiddleware } from '../middlewares/middleware.js';
import { RequestMethod } from '../../enums/request-method.js';

export interface IRequestRoute {
  path: string;
  method: keyof Pick<Router, RequestMethod>;
  func: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
