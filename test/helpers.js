const CONST = require('./constants');

/**
 * Create unique name
 *
 * @param {string} prefix - Prefix name
 *
 * @returns {string} name
 */
module.exports.createName = function* createName(prefix) {
  let index = 0;
  while (true) {
    yield `${prefix}-${index}`;
    index += 1;
  }
};

/**
 * Create generator unique name for tests
 *
 * @returns {string} Name directory
 */
const generatorName = this.createName(CONST.NAME_SPACE);
module.exports.createUniqName = () => generatorName.next().value;

/**
 * Create uniqe path file config
 */
module.exports.createPathConfig = () => `${process.cwd()}/${this.createUniqName()}.json`;
