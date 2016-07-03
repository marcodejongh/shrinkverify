// 3rd party modules
var shell = require('./shell');

// public
module.exports = readPkgJson;

// implementation
function readPkgJson (dep) {
  return shell('npm view ' + dep.id + ' --json')
    .then(success, fail)
    .catch(fail);

  function success (json) {
    return parsePkgJson(dep, json);
  }

  function fail () {
    return '';
  }
}

function parsePkgJson (dep, json) {
  return new Promise(function (resolve, reject) {
    var meta = JSON.parse(json);
    resolve(meta);
  });
}
