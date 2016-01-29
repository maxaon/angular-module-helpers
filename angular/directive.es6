const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const helpers = require('./_helpers');

module.exports = function (args) {
  let [directiveName, createTemplate, controllerName] = args;
  let moduleNmae = helpers.getModuleName();
  let [rootModule] = moduleNmae.split('.');
  let template = helpers.getTemplate('directive.es6');

  if (!directiveName || directiveName === 1) {
    directiveName = moduleNmae.split('.').pop();
  }
  directiveName = _.camelCase(directiveName);

  if (directiveName.indexOf(rootModule) !== 0) {
    directiveName = [rootModule, directiveName[0].toUpperCase(), directiveName.slice(1)].join('');
  }

  let fileName = _.kebabCase(directiveName.slice(rootModule.length));

  console.log(`Created directive '${directiveName}' in '${fileName}'`);

  let directiveContent = [];
  if (createTemplate) {
    let templateFilePath = path.join(process.cwd(), fileName + '.template.html');
    fs.writeFileSync(templateFilePath, '');
    let templateUrl = path.relative(helpers.rootServePath, templateFilePath);
    templateUrl = templateUrl.replace(/\\/g, '/');
    directiveContent.push(`templateUrl: '${templateUrl}'`);
    console.log(`Created template '${templateFilePath}'`);
  }

  if (controllerName) {
    if (controllerName === 1) {
      controllerName = _.capitalize(_.camelCase(directiveName.slice(rootModule.length)));
    }
    if (!controllerName.includes('Controller')) {
      controllerName += 'Controller';
    }

    const controller = require('./controller');
    controller([controllerName]);

    directiveContent.push(`controller: '${controllerName}'`);
  }

  let fileContent = template({
    moduleName: moduleNmae,
    directiveName: directiveName,
    directiveContent: directiveContent.join(',\n      ')
  });

  let filePath = path.join(process.cwd(), fileName + '.directive.es6');

  fs.writeFileSync(filePath, fileContent);


};
