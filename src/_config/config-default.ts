import ILogger from '../interfaces/logger.js';
import StandardLogger from '../classes/loggers/standard-logger.js';
import UserController from '../classes/controllers/user-controller.js';

export default class Config {
  private static _logger: ILogger;
  private static _userController: UserController;

  static {
    this._logger = new StandardLogger();
    this._userController = new UserController(this._logger);
  }

  public static get PORT(): number {
    return 8000;
  }

  public static get LOGGER(): ILogger {
    return this._logger;
  }

  public static get USER_CONTROLLER(): UserController {
    return this._userController;
  }
}
