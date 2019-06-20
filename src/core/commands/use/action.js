const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');

const getListTemplates = require('../../common/get-list-templates');
const cloneDir = require('../../common/clone-dir');
const modules = require('../../common/modules');
const package = require('../../../index');

/**
 * Action use template
 * @param {Object} options
 * @param {string} options.nameModule
 * @param {string} [options.nameTemplate]
 * @param {string} [options.path]
 *
 * @returns {Promise<boolean>}
 */
const action = async ({ nameModule, nameTemplate, path }) => {
  // Get path to module
  const pathModule = await modules.getPathModule(nameModule);

  // Get name template
  const { nameTemplate } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nameTemplate',
      message: 'Select template',
      choices: getListTemplates(pathModule),
    },
  ]);

  // Clone template
  const pathTo = process.cwd() + (path ? `/${path}` : '');
  const pathTemplate = `${pathModule}/${nameTemplate}`;
  const pathFrom = `${pathTemplate}/template`;
  const pathIndex = `${pathTemplate}/index.js`;

  // Check `index.js`, if exist run his
  if (fs.existsSync(pathIndex)) {
    const params = {
      pathModule,
      pathTemplate,
      pathFrom,
      pathTo,
    };
    const requirePackages = { inquirer, ora };
    return await require(pathIndex)(params, package, requirePackages);
  }

  // Use template, clone directory template
  cloneDir(pathFrom, pathTo);

  return true;
};

module.exports = (nameModule, nameTemplate, options) => {
  (async () => {
    const indicator = ora('Use template').start();
    const result = action({ ...options, nameModule, nameTemplate });

    if (result) {
      indicator.succeed('Template used');
    } else {
      indicator.succeed("Template doesn't used");
    }
  })();
};
module.exports.action = action;
