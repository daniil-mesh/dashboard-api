import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { IMiddleware } from '../../interfaces/middlewares/middleware.js';
import { ILogger } from '../../interfaces/loggers/logger.js';

export class AuthMiddleware implements IMiddleware {
  constructor(
    private secret: string,
    private logger: ILogger,
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(' ') as string[];
      try {
        const payload = jsonwebtoken.verify(token, this.secret);
        req.mail = (payload as jsonwebtoken.JwtPayload).mail;
      } catch (e) {
        if (e instanceof Error) {
          this.logger.error(`AUTH: ${e.message} -  ${token}`);
          res.status(401).json(e.message);
          return;
        }
      }
    }
    next();
  }
}
