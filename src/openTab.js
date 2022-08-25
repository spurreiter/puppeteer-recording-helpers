/** @typedef {import('puppeteer').Browser} Browser */
/** @typedef {import('puppeteer').Page} Page */

/**
 * Opens a new tab
 * @param {Browser} browser
 * @param {number} [timeout=5000]
 * @returns {Promise<Page>}
 */
export async function openTab (browser, timeout = 5000) {
  const page = await browser.newPage()
  page.setDefaultTimeout(timeout)
  return page
}
