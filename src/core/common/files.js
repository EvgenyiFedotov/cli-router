const fs = require('fs');

/**
 * Create directory
 *
 * @param {string} path - Path to create directory
 *
 * @returns {void}
 */
const createDir = (path) => {
  const isExist = fs.existsSync(path);
  if (isExist === false) {
    fs.mkdirSync(path);
  }
};

/**
 * Create directory recursively
 *
 * @param {string} path - Path to create directory
 *
 * @returns {void}
 */
const createDirRecurs = (path) => {
  const cbCreateDir = (memo, element) => {
    createDir(memo);
    return `${memo}${element}/`;
  };
  path.split('/').reduce(cbCreateDir, '/');
  createDir(path);
};

/**
 * @typedef ParamsCallbackCloneFile
 * @property {Buffer} file - Readed file
 * @property {string} fileStr - Readed content file
 * @property {string} pathFrom - Path from clone
 * @property {string} pathTo - Path to clone
 */

/**
 * Clone file from -> to
 *
 * @param {string} pathFrom - Path from clone
 * @param {string} pathTo - Path to clone
 * @param {(params: ParamsCallbackCloneFile) => void} [callback] - Callback for replace content file (maybe by chunks)
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

module.exports.createDir = createDir;
module.exports.createDirRecurs = createDirRecurs;
module.exports.cloneFile = cloneFile;
