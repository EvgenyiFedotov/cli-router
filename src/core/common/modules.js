const fs = require('fs');

/**
 * Check exist file modules config
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
const existModulesConfig = path => fs.existsSync(path);

/**
 * Create file modules config
 *
 * @param {string} path
 *
 * @returns {void}
 */
const createModulesConfig = (path) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
};

/**
 * Add module in list modules
 *
 * @param {string} pathModuleConfig
 * @param {string} nameModule
 * @param {string} pathModule
 * @param {Object<string, {}>} [configModule.templates]
 */
const addModule = (pathModuleConfig, nameModule, pathModule) => {
  if (!pathModuleConfig || !nameModule || !pathModule) throw new Error('Args does not correct');
  if (!existModulesConfig(pathModuleConfig)) throw new Error('Modules config does not exist');

  const modules = require(pathModuleConfig);

  if (modules[nameModule]) {
    throw new Error('Module exist');
  }

  modules[nameModule] = pathModule;
  fs.writeFileSync(pathModuleConfig, JSON.stringify(modules, null, '  '));
};

/**
 * Delete module from `modules.json`
 *
 * @param {string} pathModuleConfig
 * @param {String} nameModule
 *
 * @returns {boolean}
 */
const deleteModule = (pathModuleConfig, nameModule) => {
  if (!pathModuleConfig || !nameModule) throw new Error('Args does not correct');
  if (existModulesConfig(pathModuleConfig) === false) {
    throw new Error("Modules config doesn't exist");
  }

  const modules = require(pathModuleConfig);
  if (!modules[nameModule]) {
    throw new Error("Module doesn't exist");
  }
  delete modules[nameModule];
  fs.writeFileSync(pathModuleConfig, JSON.stringify(modules, null, '  '));
};

/**
 * Get path to module
 *
 * @param {string} pathModuleConfig
 * @param {String} nameModule
 *
 * @returns {string}
 */
const getPathModule = (pathModuleConfig, nameModule) => {
  if (pathModuleConfig && existModulesConfig(pathModuleConfig)) {
    const modules = require(pathModuleConfig);
    return modules[nameModule];
  }

  return undefined;
};

/**
 * Get list modules
 *
 * @param {string} pathModuleConfig
 *
 * @returns {Array<string>}
 */
const getListModules = (pathModuleConfig) => {
  if (!pathModuleConfig) throw new Error('Passed `pathModuleConfig`');
  if (!existModulesConfig(pathModuleConfig)) throw new Error('Modules config does not exist');

  const modules = require(pathModuleConfig);
  return Object.keys(modules);
};

module.exports.existModulesConfig = existModulesConfig;
module.exports.createModulesConfig = createModulesConfig;
module.exports.addModule = addModule;
module.exports.deleteModule = deleteModule;
module.exports.getPathModule = getPathModule;
module.exports.getListModules = getListModules;
