import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { Dependency } from './enums/dependency.js';
import App from './classes/app.js';
import ExceptionFilter from './classes/filters/exception-filter.js';
import IBootstrap from './interfaces/bootstrap.js';
import ILogger from './interfaces/logger.js';
import StandardLogger from './classes/loggers/standard-logger.js';
import UserController from './classes/controllers/user-controller.js';
import UserService from './classes/services/user-service.js';

const appBindings = new ContainerModule((bind) => {
  bind<App>(Dependency.App).to(App);
  bind<ExceptionFilter>(Dependency.ExceptionFilter).to(ExceptionFilter);
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
