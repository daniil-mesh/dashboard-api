import { Container } from 'inversify';
import App from '../classes/app.js';

export default interface IBootstrap {
  app: App;
  container: Container;
}
