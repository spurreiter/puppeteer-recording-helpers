import { dirname, basename, resolve } from 'path'
import { mkdirp } from './mkdirp.js'

/** @typedef {import('puppeteer').Page} Page */
/** @typedef {import('puppeteer').ScreenshotOptions} ScreenshotOptions */

const dateOfRun = new Date().toISOString()
const screenshotBaseDir = process.env.SCREENSHOT_DIR || process.cwd()

const toPath = (path) => {
  const base = basename(path)
  return resolve(screenshotBaseDir, dirname(path), dateOfRun, base)
}

/**
 * Take a screenshot
 *
 * screenshots are saved by date of run using `<dirname>/<date>/<basename>`
 * e.g. `/tmp/test.jpg` will be stored under `/tmp/<date>/test.jpg`
 * Creates missing directories
 *
 * env-vars:
 * - `SCREENSHOT_DIR=<path>` choose a different location for screenshots than the current working directory
 *
 * @param {Page} page
 * @param {string} filename
 * @param {ScreenshotOptions} options
 * @returns {Promise<string|Buffer>}
 */
export async function screenshot (page, filename, options = {}) {
  const opts = {
    path: toPath(filename),
    ...options
  }
  await mkdirp(dirname(opts.path))

  return page.screenshot(opts)
}
