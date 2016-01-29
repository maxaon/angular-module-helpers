const fs = require('fs');
const path = require('path');
const os = require('os');
const _ = require('lodash');
const helpers = require('./_helpers');
const np = helpers.np;

const moduleMap = helpers.moduleMap;
const cwd = np(process.cwd());

module.exports = function (args) {
  let [ngModuleName] = args;
  let currentRootModule = _.findKey(moduleMap, p => cwd.includes(p));
  let module, subModules;
  if (ngModuleName.includes(currentRootModule)) {
    //[module, ...subModules] = ngModuleName.split('.');
    throw new NotImplemented();
  } else {
    console.log(module);
    module = currentRootModule;
    let subPath = path.relative(moduleMap[module], cwd).split('\\');
    subModules = [...subPath, ...ngModuleName.split('.')];
  }
  let dirPath = path.join.apply(path.join, [moduleMap[module], ...subModules]);
  let filename = subModules.slice(-1)[0];
  let filePath = path.join(dirPath, `${filename}.module.es6`);
  if (fs.existsSync(filePath)) {
    throw new Error(`Module exist by path '${filePath}'`);
  }

  let template = helpers.getTemplate('module.es6');
  let fileContent = template({
    moduleName: [module, ...subModules].join('.')
  });

  mkdirpSync(dirPath);
  fs.writeFileSync(filePath, fileContent);
};

function mkdirpSync(dirpath) {
  var parts = dirpath.split(path.sep);
  let start = path.isAbsolute(dirpath) ? 2 : 1;
  for (var i = start; i <= parts.length; i++) {
    try {
      let p = path.join.apply(null, parts.slice(0, i));
      console.log(p);
      fs.mkdirSync(p);
    }
    catch (ex) {
      if (ex.code !== 'EEXIST') {
        throw ex;
      }
    }
  }
}
