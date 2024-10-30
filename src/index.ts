import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';

import { ConfigService } from './classes/services/config-service.js';
import { Dependency } from './enums/dependency.js';
import { ErrorFilter } from './classes/error/error-filter.js';
import { IApp } from './interfaces/app.js';
import { IBootstrap } from './interfaces/bootstrap.js';
import { IConfigService } from './interfaces/services/config-service.js';
import { IFilter } from './interfaces/errors/filter.js';
import { ILogger } from './interfaces/loggers/logger.js';
import { IPrismaService } from './interfaces/services/prisma-service.js';
import { IUserController } from './interfaces/controllers/user-controller.js';
import { IUserRepository } from './interfaces/repositories/user-repository.js';
import { IUserService } from './interfaces/services/user-service.js';
import { PrismaService } from './classes/services/prisma-service.js';
import { StandardLogger } from './classes/loggers/standard-logger.js';
import { UserController } from './classes/controllers/user-controller.js';
import { UserRepository } from './classes/repositories/user-repository.js';
import { UserService } from './classes/services/user-service.js';
import App from './classes/app.js';

const appBindings = new ContainerModule((bind) => {
  bind<IApp>(Dependency.IApp).to(App).inSingletonScope();
  bind<IConfigService>(Dependency.IConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<IFilter>(Dependency.IFilter).to(ErrorFilter).inSingletonScope();
  bind<ILogger>(Dependency.ILogger).to(StandardLogger).inSingletonScope();
  bind<IPrismaService>(Dependency.IPrismaService)
    .to(PrismaService)
    .inSingletonScope();
});

const userBindings = new ContainerModule((bind) => {
  bind<IUserController>(Dependency.IUserController)
    .to(UserController)
    .inSingletonScope();
  bind<IUserRepository>(Dependency.IUserRepository)
    .to(UserRepository)
    .inSingletonScope();
  bind<IUserService>(Dependency.IUserService)
    .to(UserService)
    .inSingletonScope();
});

function bootstrap(): IBootstrap {
  const container = new Container();
  container.load(appBindings, userBindings);
  const app = container.get<App>(Dependency.IApp);
  app.init();
  return { app, container };
}

export const { app, container } = bootstrap();
