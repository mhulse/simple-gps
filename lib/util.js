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

    return await fs.pathExists(target);

  },

  makeObject: function(str) {

    return str.split('\n').reduce((obj, value) => {

      let parts = value.split(':');

      if (parts[0] && parts[1]) {

        obj[parts[0].replace(/\s+/g, '')] = parts[1].trim();

      }

      return obj;

    }, {});

  },

};

module.exports = util;
