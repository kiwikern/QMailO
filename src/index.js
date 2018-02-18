const QMailFinder = require('./qmail/qmail.finder');
const config = require('../config.js');
const log = require('./logger').getLogger('index');
require('./logger').setLogLevel(config.loglevel);

class Application {
  constructor() {
  }

  run() {
    log.debug('run()');
    const finder = new QMailFinder();
    finder.readFiles();
  }
}

const app = new Application();
app.run();

