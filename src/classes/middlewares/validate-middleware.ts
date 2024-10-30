import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

import { ILogger } from '../../interfaces/loggers/logger.js';
import { IMiddleware } from '../../interfaces/middlewares/middleware.js';

export class ValidateMiddleware implements IMiddleware {
  constructor(
    private classToValidate: ClassConstructor<object>,
    private logger: ILogger,
  ) {}

  async execute(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const instance = plainToInstance(this.classToValidate, body);
    const errors = await validate(instance);
    if (errors.length) {
      this.logger?.warn('VALIDATE:', errors);
      res.status(422).send(errors);
      return;
    }
    next();
  }
}
