import { NextFunction, Request, Response } from 'express';
import IExceptionFilter from '../../interfaces/exception-filter.js';
import ILogger from '../../interfaces/logger.js';

export default class ExceptionFilter implements IExceptionFilter {
  logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  catch(err: Error, req: Request, res: Response, next: NextFunction) {
    this.logger.error(err.message);
    res.status(500).send({ error: err.message });
  }
}
