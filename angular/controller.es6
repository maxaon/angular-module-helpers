const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const helpers = require('./_helpers');

module.exports = function (args) {
  let [controllerName] = args;
  let moduleName = helpers.getModuleName();
  let [rootModule] = moduleName.split('.');

  if (!controllerName) {
    let componentName = moduleName.split('.').pop();
    controllerName = _.capitalize(_.camelCase(componentName));
  }

  let template = helpers.getTemplate('controller.es6');

  if (!controllerName.includes('Controller')) {
    controllerName += 'Controller';
  }
  console.log(controllerName);
  let fileName = _.kebabCase(controllerName.slice(0, -'Controller'.length));


  let fileContent = template({
    moduleName: moduleName,
    controllerName: controllerName
  });

  let filePath = path.join(process.cwd(), fileName + '.controller.es6');

  fs.writeFileSync(filePath, fileContent);


};
