const { existsSync, statSync } = require('fs');

const { action } = require('../../../src/core/commands/create/action');
const modules = require('../../../src/core/common/modules');

const { rm } = require('../../helpers');
const { nameTemplate, pathTemplate } = require('../../__mocks__/constants');

// Get path to created template
const getPathCreatedTemplate = async () => {
  const pathModule = await modules.getPathModule();
  return `${pathModule}/${nameTemplate}`;
};

afterAll(async () => {
  // Remove created templates
  const path = await getPathCreatedTemplate();
  rm(path);
});

test('in `main` module', async () => {
  // Check create template
  const result = await action({ nameTemplate, path: pathTemplate });
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

test('double in `main` module', async () => {
  // Check don't create template
  const result = await action({ nameTemplate, path: pathTemplate });
  expect(result).toBe(false);
});

test('in `other` module', () => {});
