const modules = require('../../../src/core/common/modules');
const config = require('../../../config');

const { rm } = require('../../helpers');
const { nameModule, pathModule } = require('../../__mocks__/constants');

afterAll(() => {
  rm(config.paths.modulesJson);
});

test("existModulesJson() [modulesJson doesn't exist]", () => {
  expect(modules.existModulesJson()).toBe(false);
});

test('addModule()', async () => {
  await expect(modules.addModule(nameModule, pathModule)).resolves.toBe(true);
});

test('existModulesJson() [modulesJson exist]', () => {
  expect(modules.existModulesJson()).toBe(true);
});

test('double addModule()', async () => {
  await expect(modules.addModule(nameModule, pathModule)).resolves.toBe(false);
});

test('getPathModule()', async () => {
  await expect(modules.getPathModule(nameModule)).resolves.toBe(pathModule);
});

test('getListModules()', async () => {
  await expect(modules.getListModules()).resolves.toEqual(expect.arrayContaining([nameModule]));
});

test('deleteModule()', async () => {
  await expect(modules.deleteModule(nameModule)).resolves.toBe(true);
  await expect(modules.deleteModule(nameModule)).resolves.toBe(false);
});
