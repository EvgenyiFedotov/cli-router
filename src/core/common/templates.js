const modules = require('./modules');
const files = require('./files');

/**
 * Create template in module
 *
 * @param {string} nameModule
 * @param {string} nameTemplate
 * @param {Array<string>} files - Array paths to files template
 *
 * @returns {Promise<undefined>}
 */
const createTemplate = async (nameModule, nameTemplate, files) => {
  if (!nameModule || !nameTemplate || !files || !files.length) {
    throw new Error("Args doesn't correct");
  }
};

/**
 * Delete template in module
 *
 * @param {string} nameModule
 * @param {string} nameTemplate
 *
 * @returns {Promise<undefined>}
 */
const deleteTemplate = async (nameModule, nameTemplate) => {};

/**
 * Run template in module
 *
 * @param {string} nameModule
 * @param {string} nameTemplate
 *
 * @returns {Promise<undefined>}
 */
const runTemplate = async (nameModule, nameTemplate) => {};

/**
 * Get list templates in module
 *
 * @param {string} nameModule
 *
 * @returns {Array<string>} List templates in module
 */
const getListTemplates = (nameModule) => {};

/**
 * Create api by nameModule in module
 *
 * @param {string} nameModule
 */
const createApiTemplates = nameModule => ({});

module.exports.createTemplate = createTemplate;
module.exports.deleteTemplate = deleteTemplate;
module.exports.runTemplate = runTemplate;
module.exports.getListTemplates = getListTemplates;
module.exports.createApiTemplates = createApiTemplates;
