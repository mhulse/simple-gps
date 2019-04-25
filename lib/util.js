const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

module.exports = {

  resolvePath: target => {

    return path.resolve(untildify(target));

  },

  pathExists: (target, dir = false) => {

    // Check if path’s dir exists, regardless of file:
    target = ((dir) ? path.dirname(target) : target);

    return fs.pathExists(target);

  },

  makeObject: str => {

    return str.split('\n').reduce((obj, value) => {

      const parts = value.split(':');

      if (parts[0] && parts[1]) {

        obj[parts[0].replace(/\s+/g, '')] = parts[1].trim();

      }

      return obj;

    }, {});

  },

};
