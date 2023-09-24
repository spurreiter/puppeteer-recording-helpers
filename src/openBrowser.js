import * as puppeteer from 'puppeteer'
import { openTab } from './openTab.js'

/** @typedef {import('puppeteer').PuppeteerLaunchOptions} PuppeteerLaunchOptions */
/** @typedef {import('puppeteer').Browser} Browser */
/** @typedef {import('puppeteer').Page} Page */

const toBoolean = str => !(str === 'false')

/**
 * Open a browser with one tab
 *
 * env-vars
 * - `PUPPETEER_HEADLESS=false` start in headfull mode
 * - `PUPPETEER_EXECPATH=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome` choose a different executable
 *
 * @param {PuppeteerLaunchOptions} options
 * @param {number} [timeout=5000]
 * @returns {Promise<{browser: Browser, page: Page, timeout: number}>}
 */
export async function openBrowser (options, timeout = 5000) {
  const {
    executablePath = process.env.PUPPETEER_EXECPATH,
    headless = toBoolean(process.env.PUPPETEER_HEADLESS),
    ...other
  } = options || {}

  const _headless = headless ? 'new' : false

  const browser = await puppeteer.launch({
    executablePath,
    headless: _headless,
    ...other
  })
  // Chrome always opens a single blank tab
  const pages = await browser.pages()
  await pages[0].close()

  const page = await openTab(browser, timeout)

  return { browser, page, timeout }
}
