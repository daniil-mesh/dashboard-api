import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigService, ILogger } from '../../interfaces/index.js';
import { DataType, Dependency } from '../../enums/index.js';

@injectable()
export class ConfigService implements IConfigService {
  private config?: DotenvParseOutput;

  constructor(@inject(Dependency.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('Config error');
    } else {
      this.config = result.parsed;
      this.logger.log('Config success');
    }
  }

  get(key: string, type: typeof DataType.String): string;
  get(key: string, type: typeof DataType.Number): number;
  get(key: string, type: DataType = DataType.String): number | string {
    if (!this.config) {
      throw new Error(`Config parameter error: ${key}`);
    }
    const result = this.config[key];

    if (type === 'number') {
      return Number(result);
    }
    return result;
  }
}
