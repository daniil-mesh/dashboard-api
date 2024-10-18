import ILogger from '../../interfaces/logger.js';

export default class StandardLogger implements ILogger {
  public log(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[42mLOG\x1b[0m`, ...args);
  }

  public error(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[41mERROR\x1b[0m`, ...args);
  }

  public warn(...args: unknown[]): void {
    console.log(this.getTime(), `\x1b[43mWARN\x1b[0m`, ...args);
  }

  private getTime() {
    return new Date().toLocaleString('en-UK', {
      hour12: false,
    });
  }
}