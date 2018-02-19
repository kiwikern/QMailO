const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config.js').jwtsecret;
const jwtDuration = require('../../config.js').jwtDurationInDays;
const PasswordUtil = require('./password.util');
const log = require('../logger').getLogger('Authenticator');

class Authenticator {
  constructor() {
    this.util = new PasswordUtil();
  }

  async login({password}) {
    if (!password) {
      log.debug('missing password.');
      throw {key: 'missing_password', message: 'You need to provide a password.'};
    }

    try {
      await this.util.checkPassword(password)
    } catch (err) {
      log.debug('wrong password.');
      throw {key: 'wrong_password', message: 'The entered password was not correct.'}
    }

    try {
      const jwtOptions = {algorithm: 'HS256', expiresIn: `${jwtDuration}d`};
      log.debug('token expires in', jwtOptions.expiresIn);
      return {jwt: jwt.sign({}, jwtSecret, jwtOptions)};
    } catch (error) {
      log.error('could not generate token', error);
      throw {key: 'internal_error', message: 'Could not generate token.'};
    }
  }
}

module.exports = Authenticator;