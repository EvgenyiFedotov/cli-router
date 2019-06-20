const fs = require('fs');

const modules = require('../../../src/core/common/modules');
const config = require('../../../config');

const { rm } = require('../../helpers');
const { nameModule, pathModule } = require('../../__mocks__/constants');

afterAll(async () => {
  // Remove `modules.json`
  await rm(config.paths.modulesJson);
  expect(fs.existsSync(config.paths.modulesJson)).toBe(false);
});

test("existModulesJson() [modulesJson doesn't exist]", () => {
  expect(modules.existModulesJson()).toBe(false);
});

test('addModule()', async () => {
  await expect(modules.addModule(nameModule, pathModule)).resolves.not.toThrow();
  await expect(modules.addModule(nameModule, pathModule)).rejects.toThrow();
});

test('existModulesJson() [modulesJson exist]', () => {
  expect(modules.existModulesJson()).toBe(true);
});

test('getPathModule()', () => {
  expect(modules.getPathModule(nameModule)).toBe(pathModule);
});

test('getListModules()', () => {
  expect(modules.getListModules()).toEqual(expect.arrayContaining([nameModule]));
});

test('deleteModule()', async () => {
  // Check delete module
  await expect(modules.deleteModule(nameModule)).resolves.not.toThrow();
  await expect(modules.deleteModule(nameModule)).rejects.toThrow();
});
