const EventEmitter = require('events');

class Events extends EventEmitter {}

Events.prototype.register = function () {
  const [name, callback, registrant = 'unknown'] = arguments;
  if (this.eventNames().indexOf(name) > -1) {
    return;
  }
  this.on(name, callback);
  this.emit(
    'log',
    `${registrant} registered ${name} event.`,
    'debug',
    Events.name.toLowerCase()
  );
};

exports.emitter = new Events();
