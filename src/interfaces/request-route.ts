import { NextFunction, Request, Response, Router } from 'express';
import { RequestMethod } from '../enums/request-method.js';

export default interface IRequestRoute {
  path: string;
  method: keyof Pick<Router, RequestMethod>;
  func: (req: Request, res: Response, next: NextFunction) => void;
}
