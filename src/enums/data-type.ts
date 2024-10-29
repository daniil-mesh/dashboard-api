export const DataType = {
  String: 'string',
  Number: 'number',
} as const;

export type DataType = (typeof DataType)[keyof typeof DataType];
