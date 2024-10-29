export const Dependency = {
  IApp: Symbol.for('IApp'),
  IConfigService: Symbol.for('IConfigService'),
  IFilter: Symbol.for('IFilter'),
  ILogger: Symbol.for('ILogger'),
  IUserService: Symbol.for('IUserService'),
  IUserController: Symbol.for('IUserController'),
} as const;

export type Dependency = (typeof Dependency)[keyof typeof Dependency];
