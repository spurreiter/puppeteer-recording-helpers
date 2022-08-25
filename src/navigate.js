/** @typedef {import('puppeteer').Page} Page */
/** @typedef {import('puppeteer').HTTPResponse} HTTPResponse */
/** @typedef {import('puppeteer').WaitForOptions} WaitForOptions */

/**
 * Navigates to an Url
 * @param {Page} page
 * @param {string} url
 * @param {import('puppeteer').WaitForOptions} [options]
 * @returns {Promise<HTTPResponse|null>}
 */
export async function navigate (page, url, options) {
  const promises = []
  promises.push(page.waitForNavigation())
  const httpResponse = await page.goto(url, options)
  await Promise.all(promises)
  return httpResponse
}
