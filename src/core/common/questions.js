const inquirer = require('inquirer');

const modules = require('./modules');

/**
 * Select module
 */
module.exports.selectModule = async () => {
  const { nameModule } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nameModule',
      message: 'Select module',
      choices: await modules.getListModules(),
    },
  ]);
  return nameModule;
};
