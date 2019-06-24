const modules = require('./modules');

/**
 * Create template in module
 *
 * @param {string} pathModuleConfig
 * @param {string} nameModule
 * @param {string} nameTemplate
 * @param {Array<string>} files - Array paths to files template
 */
const createTemplate = (pathModuleConfig, nameModule, nameTemplate, files) => {
  if (!pathModuleConfig || !nameTemplate || !files || !files.length) {
    throw new Error("Args doesn't correct");
  }

  const pathModule = modules.getPathModule(pathModuleConfig, nameModule);
};

/**
 * Delete template in module
 *
 * @param {string} pathModuleConfig
 * @param {string} nameTemplate
 *
 * @returns {Promise<undefined>}
 */
const deleteTemplate = async (pathModuleConfig, nameTemplate) => {};

/**
 * Run template in module
 *
 * @param {string} pathModuleConfig
 * @param {string} nameTemplate
 *
 * @returns {Promise<undefined>}
 */
const runTemplate = async (pathModuleConfig, nameTemplate) => {};

/**
 * Get list templates in module
 *
 * @param {string} pathModuleConfig
 *
 * @returns {Array<string>} List templates in module
 */
const getListTemplates = (pathModuleConfig) => {};

module.exports.createTemplate = createTemplate;
module.exports.deleteTemplate = deleteTemplate;
module.exports.runTemplate = runTemplate;
module.exports.getListTemplates = getListTemplates;
