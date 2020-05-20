#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2))._;
const command = args[0];
const subcommand = args[1];
const Console = require('./lib/console');

require('./lib/extensions');

const exec = require('child_process').exec;

global.appRoot = path.resolve(__dirname);
global.settingsPath = getSettingsPath();
global.settings = path.resolve(global.settingsPath, 'settings.json');

const Ninjadog = require('./Ninjadog');
const ninjadog = new Ninjadog();
global.Ninjadog = ninjadog;

switch (command) {
  case 'plugin': {
    if (subcommand === 'add' && args[2]) {
      const installation = exec(`npm install -g ninjadog-plugin-${args[2]}`);
      installation.stdout.pipe(process.stdout);
      installation.stderr.pipe(process.stderr);
    }

    if (subcommand === 'list') {
      ninjadog.plugins.getPlugins().then((plugins) => Console.log(plugins));
    }
    break;
  }

  case 'service': {
    const Service = require('node-windows').Service;
    const svc = new Service({
      name: pkg.name,
      description: pkg.name,
      script: path.join(__dirname, 'index.js'),
      wait: 2,
      grow: 0.5,
      env: [
        {
          name: 'APPDATA',
          value: process.env['APPDATA'],
        },
      ],
    });

    svc.on('start', function () {
      Console.log(`${svc.name} service started.`);
    });

    if (subcommand === 'install') {
      svc.on('install', function () {
        Console.log(`${svc.name} service installed.`);
        svc.start();
      });
      svc.on('alreadyinstalled', function () {
        Console.log(`${svc.name} is already installed as service`);
      });

      svc.install();
    } else if (subcommand === 'uninstall') {
      svc.on('uninstall', function () {
        Console.log(`${svc.name} service uninstalled.`);
      });
      svc.uninstall();
    } else if (subcommand === 'restart') {
      svc.stop();
      svc.on('stop', function () {
        Console.log(`${svc.name} service stopped.`);
        svc.start();
      });
    }
    break;
  }

  case 'config': {
    if (subcommand === 'edit') {
      const launch = require('launch-editor');
      launch(global.settings);
      Console.log('Opening config file.');
    }
  }
}

if (command === undefined) {
  ninjadog.on('plugins.loaded', () => {
    ninjadog.plugins.installLoadedPlugins();
  });

  ninjadog.on('ready', () => {
    Console.log(`Ninjadog ( ^ , ^)~~~~ version ${pkg.version} loaded.`);
  });

  process.stdin.resume();
}

function getSettingsPath() {
  const upOneLevel = path.resolve(global.appRoot, '..');
  const relativeConfig = path.resolve(upOneLevel, 'settings.json');
  if (fs.existsSync(relativeConfig)) {
    return upOneLevel;
  }

  return path.resolve(process.env.APPDATA, 'ninjadog');
}
