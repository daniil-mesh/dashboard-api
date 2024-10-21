import { injectable } from 'inversify';
import { Response, Router } from 'express';
import IController from '../../interfaces/controller.js';
import ILogger from '../../interfaces/logger.js';
import IRequestRoute from '../../interfaces/request-route.js';

@injectable()
export default abstract class BaseController implements IController {
  private _router: Router;

  constructor(protected logger: ILogger) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
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

  protected bindRoutes(routes: IRequestRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      this.router[route.method](route.path, route.func.bind(this));
    }
  }
}
