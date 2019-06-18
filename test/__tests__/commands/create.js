const { existsSync, statSync } = require('fs');
const { exec } = require('child_process');

const { action } = require('../../../src/core/commands/create/action');
const modules = require('../../../src/core/common/modules');

const nameTemplate = 'TestCreate';
const path = '/test/__mocks__/module/';

const getPathCreatedTemplate = async () => {
  const pathModule = await modules.getPathModule();
  return `${pathModule}/${nameTemplate}`;
};

afterAll(async () => {
  const path = await getPathCreatedTemplate();
  exec(`rm -rf ${path}`);
});

test('create template in `main` module', async () => {
  // Check create template
  const result = await action({ nameTemplate, path });
  expect(result).toBe(true);

  // Check structure created template
  const pathCreatedTemplate = await getPathCreatedTemplate();
  const pathsChecks = [
    [pathCreatedTemplate, true],
    [`${pathCreatedTemplate}/template`, true],
    [`${pathCreatedTemplate}/template/index.js`, false],
    [`${pathCreatedTemplate}/template/styled`, true],
    [`${pathCreatedTemplate}/template/styled/index.js`, false],
  ];
  pathsChecks.forEach(([path, isDir]) => {
    expect(existsSync(path)).toBe(true);
    expect(statSync(path).isDirectory()).toBe(isDir);
  });
});

test('double template in `main` module', async () => {
  // Check don't create template
  const result = await action({ nameTemplate, path });
  expect(result).toBe(false);
});
