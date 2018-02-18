const inquirer = require('inquirer');
const PasswordUtil = require('./auth/password.util');
const fs = require('fs-extra');

const portQuery = {
  name: 'port',
  type: 'input',
  message: 'What port do you want to use?',
  default: 30000,
  filter: input => parseInt(input),
  validate: input => Number.isInteger(input),
};

const pathQuery = {
  name: 'path',
  type: 'input',
  validate: input => input !== '',
  message: 'Enter the path where your .qmail files are, e.g. /home/tanisha',
};

const durationQuery = {
  name: 'jwtDurationInDays',
  type: 'input',
  message: 'Enter the duration in days, that your JWT tokens will be valid for.',
  default: 30,
  filter: input => parseInt(input),
  validate: input => Number.isInteger(input),
};

const logQuery = {
  name: 'loglevel',
  type: 'list',
  message: 'Choose a log level.',
  default: 'info',
  choices: ['error', 'info', 'debug']
};

const passwordQuery = {
  name: 'password',
  type: 'password',
  message: 'Choose a password',
  filter: input => (new PasswordUtil()).createHashedPassword(input),
};

const jwtSecretQuery = {
  name: 'jwtsecret',
  type: 'password',
  message: 'Choose a random secret for your JWT tokens. You do not need to remember this.',
  filter: input => (new PasswordUtil()).createHashedPassword(input),
};


class Configurator {
  constructor() {
    this.path = './config.js';
    this.run();
  }

  async run() {
    if (!await this.checkPathConfirmation()) {
      return;
    }
    const config = await inquirer.prompt([pathQuery, passwordQuery, jwtSecretQuery, durationQuery, portQuery, logQuery]);
    await this.persist(config);
  }

  async checkPathConfirmation() {
    if (await fs.exists(this.path)) {
      const confirmation = await inquirer.prompt({
        name: 'override',
        type: 'confirm',
        message: 'A config file already exists. Do you want to override it?',
        default: false,
      });
      return confirmation.override;
    } else {
      return true;
    }
  }

  async persist(config) {
    const configFile = `const config = ${JSON.stringify(config, null, 2)};
    
    module.exports = config;`;
    console.log(configFile);
    try {
      await fs.writeFile(this.path, configFile);
    } catch (err) {
      console.error(err);
    }
  }
}

new Configurator();

