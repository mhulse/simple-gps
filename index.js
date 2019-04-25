const exec = require('await-exec');
const { commands, util } = require('./lib/index');

module.exports = (() => {

  const formatResult = (command, result) => {

    switch (command) {

      case 'write':

        result = 'written';

        break;

      case 'read':

        result = util.makeObject(result);

        break;

      case 'remove':

        result = 'removed';

        break;

    }

    return result;

  };

  // Pass string, `read` or `write`:
  const execute = async o => {

    const result = await exec(
      commands[o.command](
        o.image,
        o.lat,
        o.lon
      ).trim()
    );

    const stderr = result.stderr.toString().trim();

    if (stderr) {
      throw new Error(stderr);
    } else {
      return formatResult(o.command, result.stdout.toString().trim());
    }

  };

  const validate = async (image, lat, lon) => {

    const o = {};

    const check = await exec(
      commands['check for system dep']('exiftool')
    );

    if ( ! (check && check.stdout && check.stdout.toString().trim().length)) {
      throw new TypeError('System dependency not installed: `exiftool`');
    }

    try {
      image = util.resolvePath(image);
    } catch (err) {
      throw new Error(`Unable to resolve image path, got \`${image}\` (${typeof image})`);
    }

    if ( ! ((typeof image === 'string') && (image.length > 0) && (await util.pathExists(image)))) {
      throw new TypeError(`Expected the first argument to be a path to a preexisting image, got \`${image}\` (${typeof image})`);
    }

    o.image = image;

    if (lat) {

      if (lon) {

        if (( ! ((typeof lat === 'number') && (lat >= -90) && (lat <= 90)))) {
          throw new TypeError(`Expected the second argument to be a valid signed degrees format latitude coordinate number between \`-90\` and \`90\`, got \`${lat}\` (${typeof lat})`);
        }

        if (( ! ((typeof lon === 'number') && (lon >= -180) && (lon <= 180)))) {
          throw new TypeError(`Expected the third argument to be a valid signed degrees format longitude coordinate number between \`-180\` and \`180\`, got \`${lon}\` (${typeof lon})`);
        }

        o.lat = lat;
        o.lon = lon;
        o.command = 'write';

      } else if ((typeof lat === 'boolean') && (lat === true)) {

        o.command = 'remove';

      }

    } else {

      o.command = 'read';

    }

    return execute(o);

  };

  return validate;

})();
