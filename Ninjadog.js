const { emitter } = require('./lib');
const PluginService = require('./Services/Plugins');
const EventEmitter = require('events');

module.exports = class Ninjadog extends EventEmitter {
  constructor() {
    super();
    this.registerGlobals();
    this.services = {};

    const plugins = new PluginService();

    plugins.on('plugins.loaded', (loaded) => {
      this.emit('plugins.loaded');
    });

    plugins.on('plugins.installed', (installed) => {
      this.emit('ready');
    });

    this.services.plugins = plugins;
  }

  get plugins() {
    return this.services.plugins;
  }

  registerGlobals() {
    global.emitter = emitter;
  }
};
