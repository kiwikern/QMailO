const config = require('../config.js');
const log = require('./logger').getLogger('Application');
const Koa = require('koa');
const Router = require('koa-router');
const QMailFinder = require('./qmail/qmail.finder');
require('./logger').setLogLevel(config.loglevel);

class Application {
  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.finder = new QMailFinder();
  }

  run() {


    log.debug('run()');

    this.router.get('/files', async ctx => {
      const search = ctx.request.query.search;
      ctx.body = await this.finder.readFiles(search);
    });

    this.app.use(this.router.routes())
      .use(this.router.allowedMethods())
      .listen(3000);
  }
}

const app = new Application();
app.run();

