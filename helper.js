let yargs = require('yargs');

class NotImplemented extends Error {

}
global.NotImplementd = NotImplemented;

let [module, ...args] = yargs.argv._;
module = module.replace('.', '/');
require(`./${module}`)(args);
