const ora = require('ora');
const fs = require('fs');

const modules = require('../../common/modules');
const cloneDir = require('../../common/clone-dir');

/**
 * @param {Object} options
 * @param {string} options.nameTemplate
 * @param {string} options.nameModule
 * @param {string} options.path
 */
const action = async ({ nameTemplate, nameModule, path }) => {
  let result = false;

  // Get path to module by `nameModule`
  const pathToModule = await modules.getPathModule(nameModule);

  // Create folder
  const pathTo = `${pathToModule}/${nameTemplate}/template`;

  if (fs.existsSync(pathTo) === false) {
    // Create folder for template
    cloneDir.createRecursiveDir(pathTo);

    // Clone template
    const pathFrom = process.cwd() + (path ? `/${path}` : '');
    cloneDir(pathFrom, pathTo);
    result = true;
  }

  return result;
};

module.exports = (nameTemplate, options = {}) => {
  (async () => {
    const indicator = ora('Create template').start();
    const result = await action({ ...options, nameTemplate });

    if (result) {
      indicator.succeed('Template created');
    } else {
      indicator.fail("Template doesn't created");
    }
  })();
};
module.exports.action = action;
