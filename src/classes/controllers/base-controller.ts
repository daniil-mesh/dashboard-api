import { injectable } from 'inversify';
import { Response, Router } from 'express';

import { IController, ILogger, IRequestRoute } from '../../interfaces/index.js';

@injectable()
export abstract class BaseController implements IController {
  protected abstract _path: string;

  private _router: Router;

  constructor(protected logger: ILogger) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  public get path(): string {
    return `/${this._path}`;
  }

  protected ok<T>(res: Response, message: T): void {
    this.send<T>(res, 200, message);
  }

  protected created<T>(res: Response, message: T): void {
    this.send<T>(res, 201, message);
  }

  protected send<T>(res: Response, code: number, message: T): void {
    res.status(code).type('application/json').json(message);
  }

  protected bindRoutes(path: string, routes: IRequestRoute[]): void {
    for (const route of routes) {
      this.logger.log(`${route.method.toUpperCase()} ${path}${route.path}`);
      const handler = route.func.bind(this);
      const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
      const pipeline = middlewares ? [...middlewares, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
