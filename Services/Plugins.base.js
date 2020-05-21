const fs = require('fs-extra');
const path = require('path');
const Console = require('../lib/console');

module.exports = class Base {

  construct(path) {
    this.path = path;
    this.name = path ? path.split('-').pop().split('/').pop().split('\\').pop() : '';
    this.checkRequiredProperties();
    this.loadSettings();

    if (typeof this.subscriptions === 'function') {
      this.subscriptionsExist = true;
    }
    if (typeof this.routes === 'function') {
      this.routesExist = true;
    }
  }

  checkRequiredProperties() {
    if (typeof this.setup !== 'function') {
      throw `Missing setup function in ${this.path}.`;
    }
  }

  loadSettings() {
    try {
      const userSettingsFile = global.settings;
      const user = this.readFile(userSettingsFile);
      const defaults = this.readFile(`${this.path}/settings.default.json`);
      if (user.hasOwnProperty(this.name)) {
        this.settings = Object.assign(defaults, user[this.name]);
      } else {
        this.settings = defaults;
      }
      this.saveSettings(this.settings);
    } catch (error) {
      Console.log(error);
    }
  }

  writeFile(fileName, content) {
    if (!fileName.match(global.settingsPath)) {
      fileName = path.resolve(global.settingsPath, fileName);
    }

    try {
      fs.ensureFileSync(fileName);
      if (fileName.match('.json')) {
        return fs.writeJSONSync(fileName, content, { spaces: 2 });
      }
      return fs.writeFileSync(fileName, content);
    } catch (error) {
      Console.log(`error writing to file ${fileName}`);
    }
  }

  readFile(fileName) {
    if (!fileName.match(global.settingsPath)) {
      fileName = path.resolve(global.settingsPath, fileName);
    }
    try {
      if (!fs.existsSync(fileName)) {
        return null;
      }
      if (fileName.match('.json')) {
        return fs.readJSONSync(fileName);
      }
      return fs.readFileSync(fileName);
    } catch (error) {
      Console.log(`error reading file ${fileName}`);
    }
  }

  saveSettings(settings) {
    const path = global.settings;
    const settingsContent = this.readFile(path);
    settingsContent[this.name] = settings;
    this.writeFile(path, settingsContent);
  }

  route(method, path, callback) {
    method = method.toLowerCase();
    const cleanPath = path.replace(/^(\/*)/, '').replace(/(\/*)$/, '');
    const route = `/${this.name.toLowerCase()}/${cleanPath.toLowerCase()}`;
    global.emitter.emit('webserver.add-route', method, route, callback);
    this.logDiag(`Adding route ${method} ${route}`);
  }

  emit(event, payload) {
    global.emitter.emit(event, payload, 'event', this.name);
  }

  subscribe(event, callback) {
    global.emitter.register(event, callback, this.name);
  }

  logConsole(message, ...optionalParams) {
    Console.log(message, ...optionalParams);
  }

  logMessage(message, type) {
    global.emitter.emit('message', message, type, this.name);
  }

  logError(message) {
    this.logMessage(message, 'error');
  }

  logWarn(message) {
    this.logMessage(message, 'warn');
  }

  logInfo(message) {
    this.logMessage(message, 'info');
  }

  logDebug(message) {
    this.logMessage(message, 'debug');
  }

  logDiag(message) {
    this.logMessage(message, 'diag');
  }

  get installable() {
    let installable = true;
    if (!fs.existsSync(`${this.path}/settings.default.json`) && this.path) {
      installable = false;
    }
    return installable;
  }

};
