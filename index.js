const exec = require('await-exec');
const { commands, util } = require('./lib/index');

module.exports = (() => {

  function formatResult(command, result) {

    switch (command) {

      case 'write':

        result = 'written';

        break;

      case 'read':

        result = util.makeObject(result);

        break;

      case 'delete':

        result = 'deleted';

        break;

    }

    return result;

  }

  // Pass string, `read` or `write`:
  async function execute(image, lat, lon) {

    // Use passed in command, or use options as determiner:
    const command = ((lat && lon) ? 'write' : 'read');

    const result = await exec(
      commands[command](
        image,
        lat,
        lon,
      )
    );

    const stderr = result.stderr.toString().trim();

    if (stderr) {
      throw new Error(stderr);
    } else {
      return formatResult(command, result.stdout.toString().trim());
    }

  }

  async function validate(image, lat, lon) {

    const dep = 'exiftool';
    const check = await exec(
      commands['check for system dep'](dep)
    );

    if ( ! (check && check.stdout && check.stdout.toString().trim().length)) {
      throw new TypeError(`System dependency not installed: \`${dep}\``);
    }

    try {
      image = util.resolvePath(image);
    } catch(err) {
      throw new Error(`Unable to resolve image path, got \`${image}\` (${typeof image})`);
    }

    if ( ! ((typeof image === 'string') && (image.length > 0) && (await util.pathExists(image)))) {
      throw new TypeError(`Expected the first argument to be a path to a preexisting image, got \`${image}\` (${typeof image})`);
    }

    if (lat && ( ! ((typeof lat === 'number') && (lat <= 90) && (lat >= -90)))) {
      throw new TypeError(`Expected the second argument to be a valid signed degrees format latitude coordinate number between \`-90\` and \`90\`, got \`${lat}\` (${typeof lat})`);
    }

    if (lon && ( ! ((typeof lon === 'number') && (lon <= 180) && (lon >= -180)))) {
      throw new TypeError(`Expected the third argument to be a valid signed degrees format longitude coordinate number between \`-180\` and \`180\`, got \`${lon}\` (${typeof lon})`);
    }

    return await execute(image, lat, lon);

  }

  return validate;

})();
