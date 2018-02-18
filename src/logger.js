const winston = require('winston');
const level = 'warn';

const instances = [];

exports.getLogger = (label) => {
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        timestamp: true,
        label,
        level
      })
    ]
  });
  instances.push(logger);
  return logger;
};

exports.setLogLevel = level => {
  for (logger of instances) {
    logger.transports.console.level = level;
  }
};