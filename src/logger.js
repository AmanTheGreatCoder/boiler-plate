const isObjectEmpty = (objectName) => {
  return objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object;
};

const LogLevel = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};

export class Logger {
  constructor(fileName, logLevel) {
    this.fileName = fileName;
    this.lgLevel = LogLevel[logLevel] || LogLevel.debug;
  }

  check(level, message, object) {
    var msg = message;

    if (message == null) msg = 'null';
    if (message == undefined) msg = 'undefined';
    if (message == Object && !isObjectEmpty(message)) msg = JSON.stringify(message);

    const output = `[${level}]-[${this.fileName}]:--> ${msg}`;

    if (level == 'error') {
      console.error(output);
    } else if (level == 'info') {
      console.info(output, object);
    } else if (level == 'debug') {
      console.debug(output);
    } else if (level == 'fatal') {
      console.error(output, '\n', '');
    } else {
      console.log(output, object);
    }
  }

  trace(message) {
    this.check('trace', message);
  }

  debug(message) {
    this.check('debug', message);
  }

  log(message, params) {
    if (typeof message === 'object') {
      let keys = Object.keys(message);
      if (typeof keys === 'object' && keys.length !== 0) {
        for (let i = 0; i < keys.length; i++) {
          let msg = keys[i];
          let obj = message[keys[i]];
          this.check('info', msg, obj);
        }
      } else {
        let msg = `${keys} , ${message[keys]}`;
        this.check('info', msg);
      }
    } else {
      this.check('info', message, params);
    }
  }

  warn(message) {
    this.check('warn', message);
  }

  error(message) {
    this.check('error', message);
  }

  fatal(message) {
    this.check('fatal', message);
  }
}
