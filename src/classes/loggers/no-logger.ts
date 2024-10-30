import { injectable } from 'inversify';

import { ILogger } from '../../interfaces/loggers/logger.js';

@injectable()
export class NoLogger implements ILogger {
  public log(..._args: unknown[]): void {}

  public error(..._args: unknown[]): void {}

  public warn(..._args: unknown[]): void {}
}
