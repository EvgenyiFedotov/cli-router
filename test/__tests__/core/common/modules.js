const modules = require('../../../../src/core/common/modules');

const helpers = require('../../../helpers');

/**
 * Create uniqe path file config
 */
const createPathConfig = () => `${process.cwd()}/${helpers.createUniqName()}.json`;

test('existModulesConfig()', async () => {
  const nameFileConifg = createPathConfig();

  expect(modules.existModulesConfig(nameFileConifg)).toBe(false);

  modules.createModulesConfig(nameFileConifg);
  expect(modules.existModulesConfig(nameFileConifg)).toBe(true);

  await helpers.rm(nameFileConifg);
});

test('createModulesConfig()', () => {
  const nameFileConifg = createPathConfig();

  expect(() => modules.createModulesConfig(nameFileConifg)).not.toThrow();
  expect(() => modules.createModulesConfig(nameFileConifg)).not.toThrow();
  expect(modules.existModulesConfig(nameFileConifg)).toBe(true);

  helpers.rm(nameFileConifg);
});

test('addModule()', () => {
  const nameFileConifg = createPathConfig();
  const nameModule = helpers.createUniqName();
  const pathModule = helpers.createUniqName();

  expect(modules.addModule).toThrow();
  expect(() => modules.addModule(nameFileConifg, nameModule, pathModule)).toThrow();

  modules.createModulesConfig(nameFileConifg);
  expect(() => modules.addModule(nameFileConifg, nameModule, pathModule)).not.toThrow();
  expect(() => modules.addModule(nameFileConifg, nameModule, pathModule)).toThrow();

  helpers.rm(nameFileConifg);
});

test('deleteModule()', () => {
  const nameFileConifg = createPathConfig();
  const nameModule = helpers.createUniqName();
  const pathModule = helpers.createUniqName();

  expect(modules.deleteModule).toThrow();
  expect(() => modules.deleteModule(nameFileConifg, nameModule)).toThrow();

  modules.createModulesConfig(nameFileConifg);
  modules.addModule(nameFileConifg, nameModule, pathModule);
  expect(() => modules.deleteModule(nameFileConifg, nameModule)).not.toThrow();
  expect(() => modules.deleteModule(nameFileConifg, nameModule)).toThrow();

  helpers.rm(nameFileConifg);
});

test('getPathModule()', () => {
  const nameFileConifg = createPathConfig();
  const nameModule = helpers.createUniqName();
  const pathModule = helpers.createUniqName();

  expect(modules.getPathModule).not.toThrow();
  expect(modules.getPathModule(nameFileConifg, nameModule)).toBe(undefined);

  modules.createModulesConfig(nameFileConifg);
  modules.addModule(nameFileConifg, nameModule, pathModule);
  expect(modules.getPathModule(nameFileConifg, nameModule)).toBe(pathModule);

  modules.deleteModule(nameFileConifg, nameModule);
  expect(modules.getPathModule(nameFileConifg, nameModule)).toBe(undefined);

  helpers.rm(nameFileConifg);
});

test('getListModules()', () => {
  const nameFileConifg = createPathConfig();
  const nameModule0 = helpers.createUniqName();
  const pathModule0 = helpers.createUniqName();
  const nameModule1 = helpers.createUniqName();
  const pathModule1 = helpers.createUniqName();

  expect(modules.getListModules).toThrow();
  expect(() => modules.getListModules(nameFileConifg)).toThrow();

  modules.createModulesConfig(nameFileConifg);
  modules.addModule(nameFileConifg, nameModule0, pathModule0);
  modules.addModule(nameFileConifg, nameModule1, pathModule1);

  expect(() => modules.getListModules(nameFileConifg)).not.toThrow();
  expect(modules.getListModules(nameFileConifg)).toEqual(
    expect.arrayContaining([nameModule0, nameModule1]),
  );

  helpers.rm(nameFileConifg);
});
