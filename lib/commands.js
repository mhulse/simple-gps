module.exports = {

  ['check for system dep']: dep => {

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
      "${image}"; \
      echo $?
    `;

  },

  ['read']: image => {

    return `
      exiftool \
      ${image} \
      | grep GPS; \
      echo $?
    `;

  },

  ['remove']: image => {

    return `
      exiftool \
      -overwrite_original \
      -gps:all= \
      -xmp:geotag= \
      "${image}"; \
      echo $?
    `;

  },

};
