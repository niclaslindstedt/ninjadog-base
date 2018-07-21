const pkg = require('../package.json');
const fs = require('fs-extra');

module.exports = class PluginService {
  constructor() {
    this._installed = {};

    const userSettingsFile = `${global.appRoot}/plugins.json`;
    fs.ensureFile(userSettingsFile, error => {
      const settings = fs.readFileSync(userSettingsFile).toString();
      if (settings === '') {
        fs.writeJsonSync(userSettingsFile, {});
      }

      this.loadPlugins();
    });
  }

  get installed() {
    return Object.keys(this._installed);
  }

  has(pluginName) {
    return this._installed.hasOwnProperty(pluginName);
  }

  loadPlugins() {
    Object.keys(pkg.dependencies).forEach(key => {
      if (!key.match(/ninjakatt\-plugin/)) {
        return;
      }
      const plugin = require(key);
      this.install(plugin);
    });
  }

  install(Plugin) {
    if (typeof Plugin === 'object') {
      return;
    }

    const instance = new Plugin();

    if (instance.installable === false) {
      return;
    }

    instance.setup();
    this._installed[Plugin.name] = instance;
  }
};
