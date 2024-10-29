import { DataType } from '../../enums/index.js';

export interface IConfigService {
  get(key: string, type?: typeof DataType.Number): number;
  get(key: string, type?: typeof DataType.String): string;
  get(key: string, type?: DataType): string | number;
}
