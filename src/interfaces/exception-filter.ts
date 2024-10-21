import { NextFunction, Request, Response } from 'express';

export default interface IFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
