import * as fsp from 'fs/promises'
import * as path from 'path'

export async function mkdirp (dir) {
  try {
    await fsp.stat(dir)
    return
  } catch (e) {}

  const parts = path.resolve(dir).split(path.sep)
  let _dir = ''
  while (parts.length) {
    _dir += parts.shift() + '/'
    try {
      await fsp.stat(_dir)
    } catch (e) {
      await fsp.mkdir(_dir)
    }
  }
}
