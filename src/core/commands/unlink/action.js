const ora = require('ora');

const modules = require('../../common/modules');
const questions = require('../../common/questions');

const unlink = async (nameModule) => {
  const indicator = ora('Unlink module').start();

  if (modules.existModulesJson()) {
    indicator.stop();

    if (!nameModule) {
      // Get name module
      nameModule = await questions.selectModule();
    }

    indicator.start();

    const resultDelete = await modules.deleteModule(nameModule);
    if (resultDelete) {
      indicator.succeed('Module unlink');
    } else {
      indicator.fail(`Module with name \`${nameModule}\` doesn't exist`);
    }
  } else {
    indicator.fail("Modules doesn't exist");
  }
};

module.exports = (...args) => {
  unlink(...args);
};
