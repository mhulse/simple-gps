import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import gps from './index.js'
import os from 'os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixture = path.join(__dirname, 'test', 'a.jpg')
const tmpImage = path.join(os.tmpdir(), 'simple-gps-test.jpg')

;(async () => {
  if (!(await fs.pathExists(fixture))) {
    console.error(`❌ Fixture not found: ${fixture}`)
    process.exit(1)
  }

  await fs.copy(fixture, tmpImage)
  console.log(`📸 Image: ${tmpImage}`)

  try {
    const before = await gps(tmpImage)
    console.log('read:', before)
  } catch (err) {
    console.error('read error:', err.message)
  }

  console.log('-------------------------------------------')

  try {
    const write = await gps(tmpImage, 44.0520691, -123.0867536)
    console.log('write:', write)
  } catch (err) {
    console.error('write error:', err.message)
  }

  console.log('-------------------------------------------')

  try {
    const read = await gps(tmpImage)
    console.log('read:', read)
  } catch (err) {
    console.error('read error:', err.message)
  }

  console.log('-------------------------------------------')

  try {
    const clear = await gps(tmpImage, true)
    console.log('clear:', clear)
  } catch (err) {
    console.error('clear error:', err.message)
  }

  console.log('-------------------------------------------')

  try {
    const after = await gps(tmpImage)
    console.log('read:', after)
  } catch (err) {
    console.error('read error:', err.message)
  }
})()
