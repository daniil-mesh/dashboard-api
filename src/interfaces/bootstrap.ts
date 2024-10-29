import { Container } from 'inversify';

import App from '../classes/app.js';

export interface IBootstrap {
  app: App;
  container: Container;
}
