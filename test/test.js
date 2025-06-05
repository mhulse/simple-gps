import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import assert from 'assert'
import gps from '../index.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const fixture = path.join(__dirname, 'a.jpg')
const tmpImage = path.join(os.tmpdir(), 'simple-gps-test.jpg')

const lat = 44.0520691
const lon = -123.0867536

describe('simple-gps', function () {
  beforeEach(async function () {
    await fs.copy(fixture, tmpImage)
  })

  it('reads empty or missing GPS data', async function () {
    const data = await gps(tmpImage)
    assert.strictEqual(typeof data, 'object')
  })

  it('writes GPS coordinates', async function () {
    const result = await gps(tmpImage, lat, lon)
    assert.strictEqual(result, 'written')
  })

  it('reads back written GPS coordinates', async function () {
    await gps(tmpImage, lat, lon)
    const data = await gps(tmpImage)
    assert.ok(data.GPSLatitude)
    assert.ok(data.GPSLongitude)
    assert.match(data.GPSPosition, /44 deg.*N.*123 deg.*W/)
  })

  it('removes GPS metadata', async function () {
    await gps(tmpImage, lat, lon)
    const result = await gps(tmpImage, true)
    assert.strictEqual(result, 'removed')
    const data = await gps(tmpImage)
    assert.deepStrictEqual(data, {})
  })
})
