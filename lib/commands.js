module.exports = {

  ['check for system dep']: (dep) => {

    // Will return string `true` in object `stdout` key, or empty string otherwise:
    return `
      if [ ! -z "$(which ${dep})" ]; then
        echo true
      fi
    `;

  },

  ['write']: (image, lat, lon) => {

    return `
      exiftool \
      -overwrite_original \
      -GPSLatitude=${lat} \
      -GPSLatitudeRef=${lat} \
      -XMP:GPSLatitude=${lat} \
      -GPSLongitude=${lon} \
      -GPSLongitudeRef=${lon} \
      -XMP:GPSLongitude=${lon} \
      ${image}
    `;

  },

  ['read']: (image) => {

    return `
      exiftool \
      ${image} \
      | grep GPS
    `;

  },

  ['delete']: (image) => {

    return `
      exiftool \
      -gps:all= \
      ${image}
    `;

  },

};
