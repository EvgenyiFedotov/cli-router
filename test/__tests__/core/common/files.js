const fs = require('fs');

const files = require('../../../../src/core/common/files');

const helpers = require('../../../helpers');
const CONST = require('../../../constants');

/**
 * Callback for file
 */
const cb = ({ fileStr }) => fileStr.replace(/{{ name }}/g, 'handler');

test('createDir()', () => {
  const nameDir = helpers.createUniqName();
  expect(files.createDir).not.toThrow();
  expect(() => files.createDir(nameDir)).not.toThrow();
  expect(fs.existsSync(nameDir)).toBe(true);

  helpers.rm(nameDir);
});

test('createDirRecurs()', () => {
  const nameDir1 = helpers.createUniqName();
  const nameDir2 = helpers.createUniqName();
  const nameDir3 = helpers.createUniqName();
  const path = `${nameDir1}/${nameDir2}/${nameDir3}`;

  files.createDirRecurs(path);
  expect(fs.existsSync(path)).toBe(true);

  helpers.rm(nameDir1);
});

describe('cloneFile()', () => {
  test('without `callback`', () => {
    const nameDir = helpers.createUniqName();

    expect(() => {
      files.cloneFile(`${CONST.PATH_MOCK_MODULE}/index.js`, `${nameDir}/index.js`);
    }).toThrow();

    files.createDir(nameDir);
    expect(() => {
      files.cloneFile(`${CONST.PATH_MOCK_MODULE}/index.js`, `${nameDir}/index.js`);
    }).not.toThrow();
    expect(fs.existsSync(`${nameDir}/index.js`)).toBe(true);

    helpers.rm(nameDir);
  });

  test('with `callback`', () => {
    const nameDir = helpers.createUniqName();

    files.createDir(nameDir);
    expect(() => {
      files.cloneFile(`${CONST.PATH_MOCK_MODULE}/index.js`, `${nameDir}/index.js`, cb);
    }).not.toThrow();

    const mockFile = fs.readFileSync(`${CONST.PATH_MOCK_MODULE_WITH_CB}/index.js`);
    const clonedFile = fs.readFileSync(`${nameDir}/index.js`);
    expect(clonedFile.toString()).toBe(mockFile.toString());

    helpers.rm(nameDir);
  });
});

describe('cloneDir()', () => {
  test('without `callback`', () => {
    const nameDir = helpers.createUniqName();

    expect(files.cloneDir).toThrow();

    expect(() => {
      files.cloneDir(CONST.PATH_MOCK_MODULE, nameDir);
    }).not.toThrow();
    expect(fs.existsSync(`${nameDir}/index.js`)).toBe(true);

    helpers.rm(nameDir);
  });

  test('with `callback`', async () => {
    const nameDir = helpers.createUniqName();

    expect(() => {
      files.cloneDir(CONST.PATH_MOCK_MODULE, nameDir, cb);
    }).not.toThrow();

    const mockFile = fs.readFileSync(`${CONST.PATH_MOCK_MODULE_WITH_CB}/index.js`);
    const clonedFile = fs.readFileSync(`${nameDir}/index.js`);
    expect(clonedFile.toString()).toBe(mockFile.toString());

    await helpers.rm(nameDir);
  });
});
