const fs = require('fs-extra');
const log = require('../logger').getLogger('QMailCreator');
const path = require('../../config').path;

class QMailCreator {

  async createFile({name, content}, isUpdate) {
    log.debug(`createFile()`, {name, content});
    await this._checkPath();
    const fileName = await this._checkFile(name, isUpdate);
    this._checkContent(content);

    return await this._createFile(fileName, content);
  }

  async _createFile(name, content) {
    try {
      await fs.writeFile(`${path}/.qmail-${name}`, content);
    } catch (err) {
      log.error('Could not create file.', {name, content});
      throw {
        key: 'internal_error',
        message: `Could not create file.`
      };
    }
  }

  _checkContent(content) {
    if (!content) {
      log.error('No content given.', content);
      throw {
        key: 'missing_content',
        message: `Path ${path} could not be found`
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

  async _checkFile(name, isUpdate) {
    if (!name) {
      log.error('No filename given.', name);
      throw {
        key: 'missing_filename',
        message: `No filename was given.`
      };
    }

    const fileName = name.trim().toLowerCase();

    if (fileName.startsWith('.qmail')) {
      log.error('File should not start with .qmail.', fileName);
      throw {
        key: 'qmail_prefix',
        message: `File must not start with '.qmail', given: ${fileName}`
      };
    }

    const fileExists = await fs.exists(`${path}/.qmail-${fileName}`);
    if (fileExists && !isUpdate) {
      log.error('File already exists.', fileName);
      throw {
        key: 'file_already_exists',
        message: `File ${fileName} already exists`
      };
    } else if (!fileExists && isUpdate) {
      log.error('File does not exist yet.', fileName);
      throw {
        key: 'missing_file',
        message: `File ${fileName} does not exist.`
      };
    }
    return fileName;
  }

}

module.exports = QMailCreator;