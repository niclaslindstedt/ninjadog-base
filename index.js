const path = require('path');
const cats = require('cat-ascii-faces');
const pkg = require('./package.json');

global.appRoot = path.resolve(__dirname);

const Ninjakatt = require('./Ninjakatt');

global.Ninjakatt = new Ninjakatt();

console.log(`Ninjakatt ${cats()} version ${pkg.version} loaded.`);

process.stdin.resume();
