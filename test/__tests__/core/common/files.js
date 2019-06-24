const fs = require('fs');

const files = require('../../../../src/core/common/files');

const helpers = require('../../../helpers');

// Constants
const pathFromCloneDir = `${process.cwd()}/test/__mocks__/clone-file`;
const pathFromCloneFile = `${pathFromCloneDir}/index.js`;
const pathTestsResults = `${process.cwd()}/tests-results`;
const pathToCloneFileDir = `${pathTestsResults}/clone-file`;
const pathToCloneFile = `${pathToCloneFileDir}/index.js`;
const pathMockFile = `${__dirname}/../../../__mocks__/clone-file-with-name/index.js`;

beforeAll(() => {
  helpers.rm(pathTestsResults);
});

afterEach(() => {
  expect(() => helpers.rm(pathTestsResults)).not.toThrow();
});

test('createDir()', () => {
  expect(() => files.createDir()).toThrow();
  expect(() => files.createDir(pathTestsResults)).not.toThrow();
  expect(fs.existsSync(pathTestsResults)).toBe(true);
});

test('createDirRecurs()', () => {
  expect(() => files.createDirRecurs()).toThrow();
  expect(() => files.createDirRecurs(pathToCloneFileDir)).not.toThrow();
  expect(fs.existsSync(pathToCloneFileDir)).toBe(true);
});

describe('cloneFile()', () => {
  test('without `callback`', () => {
    expect(() => files.cloneFile(pathFromCloneFile, pathToCloneFile)).toThrow();

    // Create directory for file
    files.createDirRecurs(pathToCloneFileDir);
    expect(() => files.cloneFile(pathFromCloneFile, pathToCloneFile)).not.toThrow();
    expect(fs.existsSync(pathFromCloneFile)).toBe(true);
  });

  test('with `callback`', () => {
    // Create directory for file
    expect(() => files.createDirRecurs(pathToCloneFileDir)).not.toThrow(); // TODO
    expect(() => files.cloneFile(pathFromCloneFile, pathToCloneFile, ({ fileStr }) => fileStr.replace(/{{ name }}/g, 'handler'))).not.toThrow();
    expect(fs.existsSync(pathFromCloneFile)).toBe(true);

    const clonedFile = fs.readFileSync(pathToCloneFile);
    const mockFile = fs.readFileSync(pathMockFile);
    expect(clonedFile.toString()).toBe(mockFile.toString());
  });
});

describe('createDir()', () => {
  test('without `callback`', () => {
    expect(files.cloneDir).toThrow();
    expect(() => files.cloneDir(pathFromCloneDir, pathToCloneFileDir)).not.toThrow();
    expect(fs.existsSync(pathFromCloneFile)).toBe(true);
  });

  test('with `callback`', () => {
    expect(files.cloneDir).toThrow();
    expect(() => files.cloneDir(pathFromCloneDir, pathToCloneFileDir, ({ fileStr }) => fileStr.replace(/{{ name }}/g, 'handler'))).not.toThrow();
    expect(fs.existsSync(pathFromCloneFile)).toBe(true);

    const clonedFile = fs.readFileSync(pathToCloneFile);
    const mockFile = fs.readFileSync(pathMockFile);
    expect(clonedFile.toString()).toBe(mockFile.toString());
  });
});
