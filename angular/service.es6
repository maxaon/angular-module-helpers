const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const helpers = require('./_helpers');

module.exports = function (args) {
  let [serviceName] = args;
  let moduleName = helpers.getModuleName();
  let [rootModule] = moduleName.split('.');

  if (!serviceName) {
    serviceName = moduleName.split('.').pop();
  }
  serviceName = _.camelCase(serviceName);

  let template = helpers.getTemplate('service.es6');

  console.log(serviceName);
  let fileName = _.kebabCase(serviceName);


  let fileContent = template({
    moduleName: moduleName,
    serviceName: serviceName
  });

  let filePath = path.join(process.cwd(), fileName + '.service.es6');

  fs.writeFileSync(filePath, fileContent);


};
