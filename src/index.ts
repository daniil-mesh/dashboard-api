import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';

import { Dependency } from './enums/index.js';
import { ErrorFilter } from './classes/error/index.js';
import { IBootstrap, ILogger } from './interfaces/index.js';
import { StandardLogger } from './classes/loggers/index.js';
import { UserController } from './classes/controllers/index.js';
import { UserService } from './classes/services/index.js';
import App from './classes/app.js';

const appBindings = new ContainerModule((bind) => {
  bind<App>(Dependency.App).to(App);
  bind<ErrorFilter>(Dependency.ExceptionFilter).to(ErrorFilter);
  bind<ILogger>(Dependency.ILogger).to(StandardLogger);
  bind<UserController>(Dependency.UserController).to(UserController);
  bind<UserService>(Dependency.UserService).to(UserService);
});

function bootstrap(): IBootstrap {
  const container = new Container();
  container.load(appBindings);
  const app = container.get<App>(Dependency.App);
  app.init();
  return { app, container };
}

export const { app, container } = bootstrap();
