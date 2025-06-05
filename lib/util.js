import fs from 'fs-extra'
import path from 'path'
import untildify from 'untildify'

export function resolvePath(target) {
  return path.resolve(untildify(target))
}

export function pathExists(target, dir = false) {
  const resolved = dir ? path.dirname(target) : target
  return fs.pathExists(resolved)
}

export function makeObject(str) {
  return str.split('\n').reduce((obj, value) => {
    const parts = value.split(':')
    if (parts[0] && parts[1]) {
      obj[parts[0].replace(/\s+/g, '')] = parts[1].trim()
    }
    return obj
  }, {})
}
