const fs = require('fs-extra');
const log = require('../logger').getLogger('QMailFinder');
const path = require('../../config').path;

class QMailFinder {

  async readFiles(filter) {
    log.debug(`readFiles()`, {filter});
    await this._checkPath();
    const fileNames = await this._findFileNames(filter);
    return await this._getFileContents(fileNames);
  }

  async _getFileContents(fileNames) {
    return Promise.all(fileNames.map(async name => {
      const content = await fs.readFile(`${path}/${name}`) + '';
      log.debug('found content', {name, content});
      return {id: name.substring(7), content};
    }));
  }

  async _findFileNames(filter) {
    try {
      const files = (await fs.readdir(path))
        .filter(filename => filename.startsWith('.qmail-'))
        .filter(filename => !filter || this._fileMatchesFilter(filename, filter));
      log.debug(files);
      return files;
    } catch (error) {
      log.error(error);
      throw {
        key: 'internal_error',
        message: `Could not find file names for: ${filter}`
      };
    }
  }

  async _checkPath() {
    const hasPath = await fs.exists(path);
    if (!hasPath) {
      log.error('Path could not be found.', path);
      throw {
        key: 'invalid_path',
        message: `Path ${path} could not be found`
      };
    }
  }

  _fileMatchesFilter(filename, filter) {
    const normalizedFilter = (filter + '').trim().toLowerCase();
    const normalizedFileName = filename.toLowerCase().substring(7);
    log.debug('', {normalizedFilter, normalizedFileName});
    return normalizedFileName.includes(normalizedFilter);
  }

}

module.exports = QMailFinder;