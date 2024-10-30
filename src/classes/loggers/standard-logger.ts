import { injectable } from 'inversify';

import { ILogger } from '../../interfaces/loggers/logger.js';

@injectable()
export class StandardLogger implements ILogger {
  public log(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[42mLOG\x1b[0m`, ...args);
  }

  public error(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[41mERR\x1b[0m`, ...args);
  }

  public warn(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[43mWRN\x1b[0m`, ...args);
  }

  private getTime(): string {
    return new Date().toLocaleString('en-UK', {
      hour12: false,
    });
  }
}
