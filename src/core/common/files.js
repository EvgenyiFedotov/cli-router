const fs = require('fs');
const childProcess = require('child_process');

/**
 * Create directory
 *
 * @param {string} path - Path to create directory
 *
 * @returns {boolean} True - if directory created
 */
const createDir = (path) => {
  if (path && !fs.existsSync(path)) fs.mkdirSync(path);
};

/**
 * Create directory recursively
 *
 * @param {string} path - Path to create directory
 * @param {string} prefix - Prefix for gives correct path
 *
 * @returns {void}
 */
const createDirRecurs = (path, prefix = '') => {
  const appPath = path.split('/');

  const pathCreateDir = `${prefix}${appPath.shift()}/`;
  createDir(pathCreateDir);

  if (appPath.length) {
    createDirRecurs(appPath.join('/'), pathCreateDir);
  }
};

/**
 * @typedef ParamsCallbackCloneFile
 * @property {Buffer} file - Readed file
 * @property {string} fileStr - Readed content file
 * @property {string} pathFrom - Path from clone
 * @property {string} pathTo - Path to clone
 */

/**
 * @callback CallbackCloneFile
 * @arg {ParamsCallbackCloneFile} params
 */

/**
 * Clone file from -> to
 *
 * @param {string} pathFrom - Path from clone
 * @param {string} pathTo - Path to clone
 * @param {CallbackCloneFile} [callback] - Callback for replace content file (maybe by chunks)
 *
 * @returns {void}
 */
const cloneFile = (pathFrom, pathTo, callback) => {
  const file = fs.readFileSync(pathFrom);
  let fileStr = file.toString();

  if (callback) {
    fileStr = callback({
      file,
      fileStr,
      pathFrom,
      pathTo,
    });
  }

  fs.writeFileSync(pathTo, fileStr);
};

/**
 * Clone directory from -> to
 *
 * @param {string} pathFrom - Path from
 * @param {string} pathTo - Path to
 * @param {CallbackCloneFile} [callback] - Callback for replace content file (maybe by chunks)
 */
const cloneDir = (pathFrom, pathTo, callback) => {
  if (!pathFrom || !pathTo) throw new Error("Arguments don't correct");

  const isDir = fs.statSync(pathFrom).isDirectory();

  if (isDir) {
    createDirRecurs(pathTo);

    fs.readdirSync(pathFrom).forEach((fileName) => {
      cloneDir(`${pathFrom}/${fileName}`, `${pathTo}/${fileName}`, callback);
    });
  } else {
    cloneFile(pathFrom, pathTo, callback);
  }
};

/**
 * Remove directory or file
 *
 * @param {string} paths - Paths for remove
 *
 * @returns {Promise<undefined>}
 */
const remove = paths => new Promise(resolve => childProcess.exec(`rm -rf ${paths}`, () => {
  resolve();
}));

module.exports.createDir = createDir;
module.exports.createDirRecurs = createDirRecurs;
module.exports.cloneFile = cloneFile;
module.exports.cloneDir = cloneDir;
module.exports.remove = remove;
