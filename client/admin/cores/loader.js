/**
 * @func load modules dynamically
 */
var configs = require('configs/index.json');

var modules = {};

configs.modules.forEach((m) => {
  m.items.forEach((n) => {
    modules[n] = require('../modules/' + n + '/model');
  });
});

module.exports = {
  configs: configs,
  modules: modules
};