#! /usr/bin/env node

const path = require('path');
const cats = require('cat-ascii-faces');
const pkg = require('./package.json');
const args = require('minimist')(process.argv.slice(2))._;
const command = args[0];

const exec = require('child_process').exec;

global.appRoot = path.resolve(__dirname);

const Ninjakatt = require('./Ninjakatt');
const ninjakatt = new Ninjakatt();
global.Ninjakatt = ninjakatt;

if (command === 'plugin:install') {
  const installation = exec(`npm install --save ninjakatt-plugin-${args[1]}`);
  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);
}

if (command === 'plugin:list') {
  ninjakatt.plugins.getPlugins().then(plugins => console.log(plugins));
}

if (command === undefined) {
  ninjakatt.on('plugins.loaded', () => {
    ninjakatt.plugins.installLoadedPlugins();
  });

  ninjakatt.on('ready', () => {
    console.log(`Ninjakatt ${cats()} version ${pkg.version} loaded.`);
  });

  process.stdin.resume();
}
