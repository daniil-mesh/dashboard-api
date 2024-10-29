import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';

import { Dependency } from './enums/index.js';
import { ErrorFilter } from './classes/error/index.js';
import {
  IBootstrap,
  IConfigService,
  IFilter,
  ILogger,
  IUserController,
  IUserService,
} from './interfaces/index.js';
import { StandardLogger } from './classes/loggers/index.js';
import { UserController } from './classes/controllers/index.js';
import { ConfigService, UserService } from './classes/services/index.js';
import App from './classes/app.js';
import { IApp } from './interfaces/app.js';

const appBindings = new ContainerModule((bind) => {
  bind<IApp>(Dependency.IApp).to(App).inSingletonScope();
  bind<IFilter>(Dependency.IFilter).to(ErrorFilter).inSingletonScope();
  bind<ILogger>(Dependency.ILogger).to(StandardLogger).inSingletonScope();
  bind<IUserController>(Dependency.IUserController)
    .to(UserController)
    .inSingletonScope();
  bind<IUserService>(Dependency.IUserService)
    .to(UserService)
    .inSingletonScope();
  bind<IConfigService>(Dependency.IConfigService)
    .to(ConfigService)
    .inSingletonScope();
});

function bootstrap(): IBootstrap {
  const container = new Container();
  container.load(appBindings);
  const app = container.get<App>(Dependency.IApp);
  app.init();
  return { app, container };
}

export const { app, container } = bootstrap();
