const exec = require('await-exec');
const { commands, util } = require('./lib/index');

module.exports = class SimpleGPS {

  constructor(options = {}) {

    this._options = options;

    return this.init();

  }

  async init() {

    const o = this._options;

    const dep = 'exiftool';
    const check = await exec(
      commands['check for system dep'](dep)
    );

    if ( ! (check && check.stdout && check.stdout.toString().trim().length)) {
      throw new TypeError(`System dependency not installed: \`${dep}\``);
    }

    return this.main();

  };

  // Pass string, `read` or `write`:
  async main(command) {

    const o = this._options;

    // Use passed in command, or use options as determiner:
    command = (command || ((o.lat && o.lon) ? 'write' : 'read'));

    const gps = await exec(
      commands[command]({
        image: util.resolvePath(o.image),
        lat: o.lat,
        lon: o.lon,
      })
    );

    const stderr = gps.stderr.toString().trim();

    if (stderr) {
      throw new Error(stderr);
    } else {
      return gps.stdout.toString().trim();
    }

  };

};
