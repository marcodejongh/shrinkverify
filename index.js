var task = {
  init: require('./src/init'),
  resolveTarball: require('./src/resolveTarball'),
  addToCache: require('./src/addToCache'),
  addToBundle: require('./src/addToBundle'),
  rewriteGraph: require('./src/rewriteGraph'),
  removeFromBundle: require('./src/removeFromBundle'),
  verifyShasum: require('./src/verifyShasum')
};

module.exports = {
  analyse: analyse,
  update: update
};

function analyse (directory, strict) {
  return Promise.resolve(task.init(directory, strict));
}

function update (config) {
  return resolveTarball()
    .then(addToCache, onFail)
    .then(addToBundle, onFail)
    .then(removeFromBundle, onFail)
    .then(verifyShasum, onFail)
    .then(rewriteGraph, onFail)
    .then(onSuccess, onFail)
    .catch(onFail);

  function resolveTarball () {
    return task.resolveTarball(config.deps.missingAndUnresolved);
  }

  function addToCache () {
    return task.addToCache(config.deps.missingFromCache);
  }

  function addToBundle () {
    return task.addToBundle(config.deps.missingFromBundle);
  }

  function rewriteGraph () {
    return task.rewriteGraph(config.path.graph, config.deps.all, config.graph);
  }

  function removeFromBundle () {
    return task.removeFromBundle(config.deps.removeFromBundle);
  }

  function verifyShasum () {
    return task.verifyShasum(config.deps.all, config.strict);
  }

  function onSuccess () {
    return config;
  }

  function onFail (err) {
    return Promise.reject(err);
  }
}
