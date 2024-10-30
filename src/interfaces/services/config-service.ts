import { DataType } from '../../enums/data-type.js';

export interface IConfigService {
  get(key: string, type?: typeof DataType.Number): number;
  get(key: string, type?: typeof DataType.String): string;
  get(key: string, type?: DataType): string | number;
}
