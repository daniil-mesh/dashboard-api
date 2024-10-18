import ILogger from '../../interfaces/logger.js';

export default class NoLogger implements ILogger {
  public log(...args: unknown[]): void {}

  public error(...args: unknown[]): void {}

  public warn(...args: unknown[]): void {}
}
