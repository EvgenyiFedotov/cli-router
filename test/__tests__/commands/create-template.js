const { existsSync, statSync } = require('fs');

const { action } = require('../../../src/core/commands/create/action');
const modules = require('../../../src/core/common/modules');
const config = require('../../../config');

const { rm } = require('../../helpers');
const {
  nameTemplate, pathTemplate, nameModule, pathModule,
} = require('../../__mocks__/constants');

/**
 * Get path to created template
 * @param {String} [nameModule]
 */
const getPathCreatedTemplate = async (nameModule) => {
  const pathModule = await modules.getPathModule(nameModule);
  return `${pathModule}/${nameTemplate}`;
};

/**
 * Check structure created template
 */
const checkStructCreatedTemplate = async (nameModule) => {
  const pathCreatedTemplate = await getPathCreatedTemplate(nameModule);
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
};

afterAll(async () => {
  // Remove created templates
  const listModules = [undefined, nameModule];
  listModules.forEach(async (nameModule) => {
    const path = await getPathCreatedTemplate(nameModule);
    rm(path);
  });

  // Remove directory `other` module
  rm(pathModule);

  // Remove `modules.json`
  rm(config.paths.modulesJson);
});

test('in `main` module', async () => {
  // Check create template
  const result = await action({ nameTemplate, path: pathTemplate });
  expect(result).toBe(true);

  // Check structure created template
  await checkStructCreatedTemplate();
});

test('double in `main` module', async () => {
  // Check don't create template
  const result = await action({ nameTemplate, path: pathTemplate });
  expect(result).toBe(false);
});

test('in `other` module', async () => {
  // Add `other` module
  await modules.addModule(nameModule, pathModule);

  // Check create template
  const result = await action({ nameTemplate, nameModule, path: pathTemplate });
  expect(result).toBe(true);

  // Check structure created template
  await checkStructCreatedTemplate(nameModule);
});
