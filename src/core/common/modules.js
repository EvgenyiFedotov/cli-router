const fs = require('fs');

/**
 * Check exist `modules.json`
 *
 * @param {string} path
 *
 * @returns {Promise<boolean>}
 */
const existModulesJson = path => fs.existsSync(path);

/**
 * Create `modules.json
 *
 * @param {string} path
 *
 * @returns {void}
 */
const createModulesJson = (path) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '{}');
  }
};

/**
 * Add module in list modules
 *
 * @param {string} pathModuleJson
 * @param {string} nameModule
 * @param {string} pathModule
 * @param {Object<string, {}>} [configModule.templates]
 *
 * @returns {Promise<boolean>}
 */
const addModule = async (pathModuleJson, nameModule, pathModule) => {
  // Create `modules.json`
  createModulesJson(pathModuleJson);

  const modules = require(pathModuleJson);

  if (modules[nameModule]) {
    throw new Error('Module exist');
  }

  modules[nameModule] = pathModule;
  fs.writeFileSync(pathModuleJson, JSON.stringify(modules, null, '  '));
};

/**
 * Delete module from `modules.json`
 *
 * @param {string} pathModuleJson
 * @param {String} nameModule
 *
 * @returns {Promise<boolean>}
 */
const deleteModule = async (pathModuleJson, nameModule) => {
  if (existModulesJson(pathModuleJson) === false) {
    throw new Error("`modules.json` doesn't exist");
  }

  const modules = require(pathModuleJson);
  if (!modules[nameModule]) {
    throw new Error("Module doesn't exist");
  }
  delete modules[nameModule];
  fs.writeFileSync(pathModuleJson, JSON.stringify(modules, null, '  '));
};

/**
 * Get path to module
 *
 * @param {string} pathModuleJson
 * @param {String} nameModule
 *
 * @returns {string}
 */
const getPathModule = (pathModuleJson, nameModule) => {
  if (existModulesJson(pathModuleJson)) {
    const modules = require(pathModuleJson);
    return modules[nameModule];
  }

  return undefined;
};

/**
 * Get list modules
 *
 * @param {string} pathModuleJson
 *
 * @returns {Array<string>}
 */
const getListModules = (pathModuleJson) => {
  if (!pathModuleJson) throw new Error('Passed `pathModuleJson`');

  if (existModulesJson(pathModuleJson)) {
    const modules = require(pathModuleJson);
    return Object.keys(modules);
  }

  return [];
};

/**
 * Bind path to `module.json`
 *
 * @param {sting} path
 */
const createApiModulesJson = path => ({
  existModulesJson: (...args) => existModulesJson(path, ...args),
  createModulesJson: (...args) => createModulesJson(path, ...args),
  addModule: (...args) => addModule(path, ...args),
  deleteModule: (...args) => deleteModule(path, ...args),
  getPathModule: (...args) => getPathModule(path, ...args),
  getListModules: (...args) => getListModules(path, ...args),
});

module.exports.existModulesJson = existModulesJson;
module.exports.createModulesJson = createModulesJson;
module.exports.addModule = addModule;
module.exports.deleteModule = deleteModule;
module.exports.getPathModule = getPathModule;
module.exports.getListModules = getListModules;
module.exports.createApiModulesJson = createApiModulesJson;
