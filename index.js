import exec from 'await-exec'
import { commands, util } from './lib/index.js'

const LAT_MIN = -90
const LAT_MAX = 90
const LON_MIN = -180
const LON_MAX = 180

const formatResult = (command, result) => {
  switch (command) {
    case 'write':
      return 'written'
    case 'read':
      return util.makeObject(result)
    case 'remove':
      return 'removed'
    default:
      return result
  }
}

const execute = async (o) => {
  const result = await exec(
    commands[o.command](o.image, o.lat, o.lon).trim()
  )

  const stderr = result.stderr.toString().trim()

  if (stderr) {
    throw new Error(stderr)
  }

  return formatResult(o.command, result.stdout.toString().trim())
}

export default async function validate(image, lat, lon) {
  const o = {}

  const check = await exec(
    commands['check for system dep']('exiftool')
  )

  if (
    !(
      check &&
      check.stdout &&
      check.stdout.toString().trim().length
    )
  ) {
    throw new TypeError('System dependency not installed: `exiftool`')
  }

  try {
    image = util.resolvePath(image)
  } catch {
    throw new Error(
      `Unable to resolve image path, got \`${image}\` (${typeof image})`
    )
  }

  if (
    !(
      typeof image === 'string' &&
      image.length > 0 &&
      (await util.pathExists(image))
    )
  ) {
    throw new TypeError(
      `Expected the first argument to be a path to a preexisting image, got \`${image}\` (${typeof image})`
    )
  }

  o.image = image

  if (typeof lat !== 'undefined') {
    if (typeof lon !== 'undefined') {
      if (!(typeof lat === 'number' && lat >= LAT_MIN && lat <= LAT_MAX)) {
        throw new TypeError(
          `Expected the second argument to be a valid latitude number between ${LAT_MIN} and ${LAT_MAX}, got \`${lat}\` (${typeof lat})`
        )
      }

      if (!(typeof lon === 'number' && lon >= LON_MIN && lon <= LON_MAX)) {
        throw new TypeError(
          `Expected the third argument to be a valid longitude number between ${LON_MIN} and ${LON_MAX}, got \`${lon}\` (${typeof lon})`
        )
      }

      o.lat = lat
      o.lon = lon
      o.command = 'write'
    } else if (lat === true) {
      o.command = 'remove'
    }
  } else {
    o.command = 'read'
  }

  return execute(o)
}
