#! /usr/bin/env node

const path = require('path');
const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2))._;
const command = args[0];
const subcommand = args[1];

const exec = require('child_process').exec;

global.appRoot = path.resolve(__dirname);
global.settingsPath = path.resolve(process.env.APPDATA, 'ninjakatt');
global.settings = path.resolve(global.settingsPath, 'settings.json');

const Ninjakatt = require('./Ninjakatt');
const ninjakatt = new Ninjakatt();
global.Ninjakatt = ninjakatt;

switch (command) {
  case 'plugin': {
    if (subcommand === 'add' && args[2]) {
      const installation = exec(`npm install -g ninjakatt-plugin-${args[2]}`);
      installation.stdout.pipe(process.stdout);
      installation.stderr.pipe(process.stderr);
    }

    if (subcommand === 'list') {
      ninjakatt.plugins.getPlugins().then(plugins => console.log(plugins));
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
          value: process.env['APPDATA']
        }
      ]
    });

    svc.on('start', function() {
      console.log(`${svc.name} service started.`);
    });

    if (subcommand === 'install') {
      svc.on('install', function() {
        console.log(`${svc.name} service installed.`);
        svc.start();
      });
      svc.on('alreadyinstalled', function() {
        console.log(`${svc.name} is already installed as service`);
      });

      svc.install();
    } else if (subcommand === 'uninstall') {
      svc.on('uninstall', function() {
        console.log(`${svc.name} service uninstalled.`);
      });
      svc.uninstall();
    } else if (subcommand === 'restart') {
      svc.stop();
      svc.on('stop', function() {
        console.log(`${svc.name} service stopped.`);
        svc.start();
      });
    }
    break;
  }

  case 'config': {
    if (subcommand === 'edit') {
      const launch = require('launch-editor');
      launch(global.settings);
      console.log(`Opening config file.`);
    }
  }
}

if (command === undefined) {
  ninjakatt.on('plugins.loaded', () => {
    ninjakatt.plugins.installLoadedPlugins();
  });

  ninjakatt.on('ready', () => {
    console.log(`Ninjakatt ( ^ , ^)~~~~ version ${pkg.version} loaded.`);
  });

  process.stdin.resume();
}
