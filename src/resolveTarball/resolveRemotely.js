// 3rd party modules
var chalk = require('chalk');

// modules
var readPkgJson = require('../lib/readPkgJson');

// public
module.exports = resolveRemotely;

// implementation
function resolveRemotely (dep) {
  return readPkgJson(dep)
    .then(getTarball);

  function getTarball (meta) {
    if (!meta || !meta.dist || !meta.dist.tarball) {
      console.info(chalk.gray('? %s has no "dist.tarball" in `npm view %s --json`'), dep.id, dep.id);
      return '';
    } else {
      return meta.dist.tarball;
    }
  }
}
