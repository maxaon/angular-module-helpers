const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const helpers = require('./_helpers');

module.exports = function (args) {
  let [name] = args;
  let moduleName = helpers.getModuleName();

  if (!name) {
    name = moduleName.split('.').pop();
  }
  name = _.kebabCase(_.trim(name));
  let fileName = `_${name}.sass`;

  let fileContent = `.${name}`;

  console.log(name);

  let filePath = path.join(process.cwd(), fileName);

  fs.writeFileSync(filePath, fileContent);


};
