import { Dependency } from '../../enums/dependency.js';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import IFilter from '../../interfaces/exception-filter.js';
import ILogger from '../../interfaces/logger.js';
import HttpError from '../errors/http-error.js';

@injectable()
export default class ExceptionFilter implements IFilter {
  constructor(@inject(Dependency.ILogger) private logger: ILogger) {}

  catch(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    let code: number = 500;
    if (err instanceof HttpError) {
      code = err.statusCode;
    }

    this.logger.error(err.message);
    res.status(code).send({ error: err.message });
  }
}
