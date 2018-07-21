const { emitter } = require('./lib');
const PluginService = require('./Services/Plugins');

module.exports = class Ninjakatt {
  constructor() {
    this.registerGlobals();
    this.services = {};
    this.services.plugins = new PluginService();
  }

  get plugins() {
    return this.services.plugins;
  }
  registerGlobals() {
    global.emitter = emitter;
  }
};
