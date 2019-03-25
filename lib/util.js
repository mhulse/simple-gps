const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

const util = {

  resolvePath: function(target) {

    return path.resolve(untildify(target));

  },

  pathExists: async function(target, dir = false) {

    // Check if path’s dir exists, regardless of file:
    target = (dir) ? path.dirname(target) : target;

    return await fs.pathExists(this.resolvePath(target));

  },

};

module.exports = util;
