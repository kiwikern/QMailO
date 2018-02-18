const bcrypt = require('bcrypt');
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
      const storedPassword = require('../../config').password;
      bcrypt.compare(password, storedPassword, (err, isValid) => {
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