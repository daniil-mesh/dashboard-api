export const Dependency = {
  App: Symbol.for('App'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
} as const;

export type Dependency = (typeof Dependency)[keyof typeof Dependency];
