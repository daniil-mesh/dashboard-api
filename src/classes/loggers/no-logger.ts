import { injectable } from 'inversify';
import ILogger from '../../interfaces/logger.js';

@injectable()
export default class NoLogger implements ILogger {
  public log(...args: unknown[]): void {}

  public error(...args: unknown[]): void {}

  public warn(...args: unknown[]): void {}
}
