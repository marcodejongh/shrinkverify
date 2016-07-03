// 3rd party modules
var chalk = require('chalk');
var sha = require('sha');

// modules
var readPkgJson = require('./lib/readPkgJson');

// public
module.exports = verifyShasum;

// implementation
function verifyShasum (deps, strict) {
  if (strict) {
    return Promise.all(deps.map(checkTarShasum));
  }
}

function checkTarShasum (dep) {
  return Promise.all([remotePkgShasum(), localPkgShasum()]).then(function (values) {
    var remoteShasum = values[0];
    var localShasum = values[1];
    if (remoteShasum !== localShasum) {
      console.error(chalk.red('! failed to verify package shasum for %s'), dep.id);
      process.exit(1);
    }
    console.info(chalk.green('✓ verified package shasum for %s'), dep.id);
  });

  function remotePkgShasum () {
    return readPkgJson(dep).then(function (meta) {
      return meta.dist.shasum;
    });
  }

  function localPkgShasum () {
    return new Promise(function (resolve, reject) {
      sha.get(dep.bundle, function (er, shasum) {
        if (er) {
          reject(er);
        } else {
          resolve(shasum);
        }
      });
    });
  }
}
