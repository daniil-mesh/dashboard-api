import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';

import { ILogger, IMiddleware } from '../../interfaces/index.js';

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
      this.logger?.error(errors);
      res.status(422).send(errors);
      return;
    }
    next();
  }
}
