import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { DataType } from '../../enums/data-type.js';
import { Dependency } from '../../enums/dependency.js';
import { IConfigService } from '../../interfaces/services/config-service.js';
import { ILogger } from '../../interfaces/loggers/logger.js';

@injectable()
export class ConfigService implements IConfigService {
  private config?: DotenvParseOutput;

  constructor(@inject(Dependency.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('CONFIG: parse error');
    } else {
      this.config = result.parsed;
      this.logger.log('CONFIG: parse success');
    }
  }

  get(key: string): string;
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
