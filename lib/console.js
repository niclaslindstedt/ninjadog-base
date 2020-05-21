module.exports = class Console {

  static log(message, ...optionalParams) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
    }
  }

  static warn(message, ...optionalParams) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(message, ...optionalParams);
    }
  }

  static error(message, ...optionalParams) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams);
    }
  }

};
