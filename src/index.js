const config = require('../config.js');
const log = require('./logger').getLogger('Application');
const Koa = require('koa');
const jwt = require('koa-jwt');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const QMailFinder = require('./qmail/qmail.finder');
const QMailCreator = require('./qmail/qmail.creator');
const Authenticator = require('./auth/authenticator');
require('./logger').setLogLevel(config.loglevel);

class Application {
  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.finder = new QMailFinder();
    this.creator = new QMailCreator();
    this.authenticator = new Authenticator();
  }

  run() {
    this.router.post('/login', async ctx => {
      try {
        ctx.body = await this.authenticator.login(ctx.request.body || {});
      } catch (err) {
        ctx.body = err.message || err + '';
        ctx.response.status = this._getReturnCode(err.key)
      }
    });

    this.router.get('/files', jwt({secret: config.jwtsecret}), async ctx => {
      const search = ctx.request.query.search;
      try {
        ctx.body = await this.finder.readFiles(search);
      } catch (err) {
        ctx.body = err.message || err + '';
        ctx.response.status = this._getReturnCode(err.key)
      }
    });

    this.router.put('/files', jwt({secret: config.jwtsecret}), async ctx => {
      const newFile = ctx.request.body;
      try {
        ctx.body = await this.creator.createFile(newFile || {}, false);
      } catch (err) {
        ctx.body = err.message || err + '';
        ctx.response.status = this._getReturnCode(err.key)
      }
    });

    this.router.post('/files', jwt({secret: config.jwtsecret}), async ctx => {
      const newFile = ctx.request.body;
      try {
        ctx.body = await this.creator.createFile(newFile || {}, true);
      } catch (err) {
        ctx.body = err.message || err + '';
        ctx.response.status = this._getReturnCode(err.key)
      }
    });

    this.app
      .use(bodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods())
      .listen(config.port);
  }

  _getReturnCode(errorKey) {
    switch (errorKey) {
      case 'missing_file':
        return 404;
      case 'file_already_exists':
        return 409;
      case 'qmail_prefix':
      case 'missing_filename':
      case 'missing_content':
      case 'missing_password':
        return 400;
      case 'wrong_password':
        return 401;
      case 'invalid_path':
      case 'internal_error':
      default:
        return 500;
    }
  }
}

const app = new Application();
app.run();

