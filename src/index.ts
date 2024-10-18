import App from './classes/app.js';
import Config from './_config/config.js';

new App(Config.PORT, Config.LOGGER, Config.USER_CONTROLLER).init();
