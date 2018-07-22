const fs = require('fs-extra');
const util = require('util');
const path = require('path');
const EventEmitter = require('events');

module.exports = class PluginService extends EventEmitter {
  constructor() {
    super();
    this._installed = {};
    this._uninstalled = {};

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

  async loadPlugins() {
    const plugins = await this.getPlugins();
    plugins.forEach(name => {
      const plugin = require(path.resolve(global.appRoot, '..', name));
      this._uninstalled[plugin.name] = plugin;
    });

    this.emit('plugins.loaded', this._uninstalled);
  }

  getPlugins() {
    return new Promise((resolve, reject) => {
      let plugins = fs.readdirSync(path.resolve(global.appRoot, '..'));
      plugins = plugins.filter(
        pkg => pkg.match(/ninjakatt-plugin-/) && !pkg.match('base')
      );

      return resolve(plugins);
    });
  }

  installLoadedPlugins() {
    Object.keys(this._uninstalled).forEach(plugin => {
      this.install(this._uninstalled[plugin]);
    });
    this.emit('plugins.installed', this._installed);
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
    delete this._uninstalled[Plugin.name];
  }
};
