import { injectable } from 'inversify';
import ILogger from '../../interfaces/logger.js';

@injectable()
export default class NoLogger implements ILogger {
  public log(..._args: unknown[]): void {}

  public error(..._args: unknown[]): void {}

  public warn(..._args: unknown[]): void {}
}
