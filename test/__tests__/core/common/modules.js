const modules = require('../../../../src/core/common/modules');
const config = require('../../../../config');

const helpers = require('../../../helpers');
const mocksConstants = require('../../../__mocks__/constants');

const { modulesJson } = config.paths;

afterAll(async () => {
  await helpers.rm(modulesJson);
});

test('existModulesJson()', async () => {
  expect(modules.existModulesJson()).toBe(false);
  expect(modules.existModulesJson(modulesJson)).toBe(false);

  // Create `modules.json`
  modules.createModulesJson(modulesJson);
  expect(modules.existModulesJson(modulesJson)).toBe(true);

  await helpers.rm(modulesJson);
});

test('createModulesJson', () => {
  modules.createModulesJson(modulesJson);
  expect(modules.existModulesJson(modulesJson)).toBe(true);
});

test('addModule()', async () => {
  // Add module
  await expect(
    modules.addModule(modulesJson, mocksConstants.nameModule, mocksConstants.pathModule),
  ).resolves.not.toThrow();
  await expect(
    modules.addModule(modulesJson, mocksConstants.nameModule, mocksConstants.pathModule),
  ).rejects.toThrow();
});

test('getPathModule()', () => {
  expect(modules.getPathModule()).toBe(undefined);
  expect(modules.getPathModule(modulesJson, mocksConstants.nameModule)).toBe(
    mocksConstants.pathModule,
  );
});

test('getListModules()', () => {
  expect(modules.getListModules).toThrow();
  expect(modules.getListModules(modulesJson)).toEqual(
    expect.arrayContaining([mocksConstants.nameModule]),
  );
});

test('deleteModule()', async () => {
  await expect(modules.deleteModule(modulesJson, mocksConstants.nameModule)).resolves.not.toThrow();
  await expect(modules.deleteModule(modulesJson, mocksConstants.nameModule)).rejects.toThrow();

  expect(modules.getPathModule(modulesJson, mocksConstants.nameModule)).toBe(undefined);
  expect(modules.getListModules(modulesJson)).toEqual(expect.arrayContaining([]));

  await helpers.rm(modulesJson);
});

test('createApiModulesJson()', async () => {
  const api = modules.createApiModulesJson(modulesJson);

  expect(api.existModulesJson()).toBe(false);

  // Create `modules.json`
  api.createModulesJson();
  expect(api.existModulesJson()).toBe(true);

  // Add module
  await expect(
    api.addModule(mocksConstants.nameModule, mocksConstants.pathModule),
  ).resolves.not.toThrow();
  await expect(
    api.addModule(mocksConstants.nameModule, mocksConstants.pathModule),
  ).rejects.toThrow();

  // Get path module
  expect(api.getPathModule()).toBe(undefined);
  expect(api.getPathModule(mocksConstants.nameModule)).toBe(mocksConstants.pathModule);

  // Get list modules
  expect(api.getListModules()).toEqual(expect.arrayContaining([mocksConstants.nameModule]));

  // Delete module
  await expect(api.deleteModule(mocksConstants.nameModule)).resolves.not.toThrow();
  await expect(api.deleteModule(mocksConstants.nameModule)).rejects.toThrow();

  expect(api.getPathModule(mocksConstants.nameModule)).toBe(undefined);
  expect(api.getListModules()).toEqual(expect.arrayContaining([]));

  await helpers.rm(modulesJson);
});
