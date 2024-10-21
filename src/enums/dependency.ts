export const Dependency = {
  App: Symbol.for('App'),
  IFilter: Symbol.for('IFilter'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
} as const;

export type Dependency = (typeof Dependency)[keyof typeof Dependency];
