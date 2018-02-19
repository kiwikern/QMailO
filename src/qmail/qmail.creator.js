const fs = require('fs-extra');
const log = require('../logger').getLogger('QMailCreator');
const path = require('../../config').path;

class QMailCreator {

  async createFile({id, content}, isUpdate) {
    log.debug(`createFile()`, {id, content, isUpdate});
    await this._checkPath();
    const fileName = await this._checkFile(id, isUpdate);
    this._checkContent(content);

    return await this._createFile(fileName, content);
  }

  async deleteFile(id) {
    log.debug('deleteFile()', {id});
    await this._checkPath();
    await this._checkFile(id, true);
    return await this._deleteFile(id);
  }

  async _createFile(name, content) {
    log.debug(`_createFile()`, {name, content});
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

  async _deleteFile(name) {
    log.debug(`_deleteFile()`, {name});
    try {
      await fs.unlink(`${path}/.qmail-${name}`);
    } catch (err) {
      log.error('Could not delete file.', {name});
      throw {
        key: 'internal_error',
        message: `Could not delete file.`
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

    if (/[\.\s\\\/\?%\*:|<>]/.test(name)) {
      log.error('Contains illegal character.', name);
      throw {
        key: 'illegal_character',
        message: 'Given name contains illegal characters.'
      }
    }

    const fileName = name.trim();

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