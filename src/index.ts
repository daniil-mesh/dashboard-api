import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { Dependency } from './enums/dependency.js';
import App from './classes/app.js';
import ExceptionFilter from './classes/filters/exception-filter.js';
import IBootstrap from './interfaces/bootstrap.js';
import IFilter from './interfaces/exception-filter.js';
import ILogger from './interfaces/logger.js';
import StandardLogger from './classes/loggers/standard-logger.js';
import UserController from './classes/controllers/user-controller.js';

const appBindings = new ContainerModule((bind) => {
  bind<App>(Dependency.App).to(App);
  bind<ILogger>(Dependency.ILogger).to(StandardLogger);
  bind<IFilter>(Dependency.IFilter).to(ExceptionFilter);
  bind<UserController>(Dependency.UserController).to(UserController);
});

function bootstrap(): IBootstrap {
  const container = new Container();
  container.load(appBindings);
  const app = container.get<App>(Dependency.App);
  app.init();
  return { app, container };
}

export const { app, container } = bootstrap();
