module.exports = {

  ['check for system dep']: (dep) => {

    // Will return string `true` in object `stdout` key, or empty string otherwise:
    return `
      if [ ! -z "$(which ${dep})" ]; then
        echo true
      fi
    `;

  },

  ['write']: (args) => {

    return `
      exiftool \
      -overwrite_original \
      -GPSLatitude=${args.lat} \
      -GPSLatitudeRef=${args.lat} \
      -XMP:GPSLatitude=${args.lat} \
      -GPSLongitude=${args.lon} \
      -GPSLongitudeRef=${args.lon} \
      -XMP:GPSLongitude=${args.lon} \
      ${args.image}
    `;

  },

  ['read']: (args) => {

    return `
    `;

  },

};
