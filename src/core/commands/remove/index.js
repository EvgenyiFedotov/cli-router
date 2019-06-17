const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('remove [nameModule] [nameTemplate]')
  .description('Remove template from module')
  .action(action);
