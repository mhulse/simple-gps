const exec = require('await-exec');
const { commands, util } = require('./lib/index');

module.exports = (() => {

  // Pass string, `read` or `write`:
  async function execute(image, lat, lon) {

    // Use passed in command, or use options as determiner:
    command = ((lat && lon) ? 'write' : 'read');

    // UP NEXT:
    // Take `image`, `lat` and `lon`, possibly destructure
    // and pass to the below `command` call.

    return command;

    // const result = await exec(
    //   commands[command]({
    //     image: util.resolvePath(o.image),
    //     lat: o.lat,
    //     lon: o.lon,
    //   })
    // );
    //
    // const stderr = result.stderr.toString().trim();
    //
    // if (stderr) {
    //   throw new Error(stderr);
    // } else {
    //   return result.stdout.toString().trim();
    // }

  }

  async function validate(image, lat, lon) {

    const dep = 'exiftool';
    const check = await exec(
      commands['check for system dep'](dep)
    );

    if ( ! (check && check.stdout && check.stdout.toString().trim().length)) {
      throw new TypeError(`System dependency not installed: \`${dep}\``);
    }

    if ( ! ((typeof image === 'string') && (image.length > 0) && util.pathExists(image))) {
      throw new TypeError(`Expected the first argument to be a path to a preexisting image, got \`${image}\` (${typeof image})`);
    }

    if (lat && ( ! ((typeof lat === 'number') && (lat <= 90) && (lat >= -90)))) {
      throw new TypeError(`Expected the second argument to be a valid signed degrees format latitude coordinate number between \`-90\` and \`90\`, got \`${lat}\` (${typeof lat})`);
    }

    if (lon && ( ! ((typeof lon === 'number') && (lon <= 180) && (lon >= -180)))) {
      throw new TypeError(`Expected the third argument to be a valid signed degrees format longitude coordinate number between \`-180\` and \`180\`, got \`${lon}\` (${typeof lon})`);
    }

    return execute(image, lat, lon);

  }

  return validate;

})();
