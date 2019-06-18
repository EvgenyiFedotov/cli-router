const { exec } = require('child_process');

/**
 * Use shell command rm (for remove directory)
 * @param {string} paths
 *
 * @returns {Promise<undefined>}
 */
module.exports.rm = paths => new Promise((resolve, reject) => {
  exec(`rm -rf ${paths}`, (error) => {
    error ? reject(error) : resolve();
  });
});
