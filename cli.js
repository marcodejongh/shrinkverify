#!/usr/bin/env node

// 3rd party modules
var path = require('path');
var program = require('commander');

// modules
var cli = require('./src/cli');
var version = require('./package.json').version;

// implementation
var directoryValue;

program
  .version(version)
  .arguments('[directory]')
  .action(function (directory) {
    directoryValue = directory;
  })
  .option('--strict', 'Enable shasum check');

program.parse(process.argv);

if (directoryValue) {
  cli.run(path.resolve(directoryValue), program.strict);
} else {
  cli.run(process.cwd(), program.strict);
}
