import { NextFunction, Request, Response, Router } from 'express';

import { RequestMethod } from '../../enums/index.js';
import { IMiddleware } from '../index.js';

export interface IRequestRoute {
  path: string;
  method: keyof Pick<Router, RequestMethod>;
  func: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
