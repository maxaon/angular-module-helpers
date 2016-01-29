const fs = require('fs');
const path = require('path');
const os = require('os');
const _ = require('lodash');
function np(p) {
  return path.normalize(p).toLowerCase();
}
module.exports = {
  np: np,
  getTemplate: function getTemplate(filename) {
    let templateContent = fs.readFileSync(path.join(__dirname, 'templates', filename), {encoding: 'utf8'});
    let template = _.template(templateContent);
    return template;
  },
  moduleMap: {
    wmpcp: np('C:\\www\\projects\\wix-music-player\\app\\modules\\control-panel'),
    'wmp.shared': np('C:\\www\\projects\\wix-music-player\\app\\modules\\shared')
  },
  rootServePath: np('C:\\www\\projects\\wix-music-player\\app'),
  getModuleName: function getModuleName(dir = process.cwd()) {
    let modulePath = path.join(dir, path.basename(dir) + '.module.es6');
    let moduleFile = fs.readFileSync(modulePath, {encoding: 'utf8'});

    let match = moduleFile.match(/angular.module\(['"](.*)['"],.*/);
    if (!match) {
      throw new Error(`Cannot parse module in file '${modulePath}'`);
    }

    return match[1];

  }
};
