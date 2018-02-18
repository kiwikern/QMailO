const fs = require('fs-extra');
const log = require('../logger').getLogger('QMailFinder');
const path = require('../../config').path;

class QMailFinder {

  async readFiles(filter) {
    await this._checkPath();

    try {
      const files = (await fs.readdir(path))
        .filter(filename => filename.startsWith('.qmail-'))
        .filter(filename => !filter || this._fileMatchesFilter(filename, filter));
      log.debug(files);
    } catch (error) {
      log.error(error);
    }
  }

  async _checkPath() {
    const hasPath = await fs.exists(path);
    if (!hasPath) {
      log.error('Path could not be found.', path);
      throw new Error(`Path ${path} could not be found`);
    }
  }

  _fileMatchesFilter(filename, filter) {
      const normalizedFilter = (filter + '').trim().toLowerCase();
      return filename.toLowerCase().includes(normalizedFilter);
  }

}

module.exports = QMailFinder;