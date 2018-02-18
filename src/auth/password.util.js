const bcrypt = require('bcrypt');
const config = require('../../config');
const log = require('../logger').getLogger('PasswordUtil');

class PasswordUtil {
  createHashedPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
          return resolve(hash);
        } else {
          log.error('could not hash password', err);
          return reject(err);
        }
      });
    });
  }

  checkPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, config.password, (err, isValid) => {
        if (isValid) {
          return resolve();
        } else {
          log.debug('password incorrect.');
          return reject(new Error('wrong_password'));
        }
      });
    });
  }
}

module.exports = PasswordUtil;