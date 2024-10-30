export const Dependency = {
  IApp: Symbol.for('IApp'),
  IConfigService: Symbol.for('IConfigService'),
  IFilter: Symbol.for('IFilter'),
  ILogger: Symbol.for('ILogger'),
  IPrismaService: Symbol.for('IPrismaService'),
  IUserController: Symbol.for('IUserController'),
  IUserRepository: Symbol.for('IUserRepository'),
  IUserService: Symbol.for('IUserService'),
} as const;

export type Dependency = (typeof Dependency)[keyof typeof Dependency];
