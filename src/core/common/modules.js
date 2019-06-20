const fs = require('fs');

const config = require('../../../config');

// Path to `modules.json`
const { modulesJson } = config.paths;

// Create `modules.json`
const createModulesJson = () => {
  if (!fs.existsSync(modulesJson)) {
    fs.writeFileSync(modulesJson, '{}');
  }
};

/**
 * Check exist `modules.json`
 *
 * @returns {Promise<boolean>}
 */
const existModulesJson = () => fs.existsSync(modulesJson);

/**
 * @param {string} nameModule
 * @param {string} pathModule
 * @param {Object<string, {}>} [configModule.templates]
 *
 * @returns {Promise<boolean>}
 */
const addModule = async (nameModule, pathModule) => {
  // Create `modules.json`
  createModulesJson();

  const modules = require(modulesJson);

  if (modules[nameModule]) {
    throw new Error('Module exist');
  }

  modules[nameModule] = pathModule;
  fs.writeFileSync(modulesJson, JSON.stringify(modules, null, '  '));
};

/**
 * Delete module from `modules.json`
 * @param {String} nameModule
 *
 * @returns {Promise<boolean>}
 */
const deleteModule = async (nameModule) => {
  if (existModulesJson() === false) {
    throw new Error("`modules.json` doesn't exist");
  }

  const modules = require(modulesJson);
  if (!modules[nameModule]) {
    throw new Error("Module doesn't exist");
  }
  delete modules[nameModule];
  fs.writeFileSync(modulesJson, JSON.stringify(modules, null, '  '));
};

/**
 * Get path to module
 * @param {String} nameModule
 *
 * @returns {string}
 */
const getPathModule = (nameModule) => {
  if (existModulesJson()) {
    const modules = require(modulesJson);
    return modules[nameModule] || config.paths.defaultModule;
  }
  return config.paths.defaultModule;
};

/**
 * Get list modules
 *
 * @returns {Array<string>}
 */
const getListModules = () => {
  if (existModulesJson()) {
    const modules = require(modulesJson);
    return Object.keys(modules);
  }

  return [];
};

module.exports.existModulesJson = existModulesJson;
module.exports.addModule = addModule;
module.exports.deleteModule = deleteModule;
module.exports.getPathModule = getPathModule;
module.exports.getListModules = getListModules;
