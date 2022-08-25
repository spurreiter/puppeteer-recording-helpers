/** @typedef {import('puppeteer').Page} Page */

/**
 * Clears browser cache, cookies and/or localStorage, sessionStorage
 * @param {Page} page
 * @param {{cache?: boolean, cookies?: boolean, localStorage?: boolean, sessionStorage?: boolean}} options
 * @return {Promise<void>}
 */
export async function clearBrowserCache (page, options = {}) {
  const opts = {
    cache: true,
    cookies: true,
    localStorage: true,
    sessionStorage: true,
    ...options
  }

  const promises = []

  if (opts.localStorage) {
    promises.push(page.evaluate(() => localStorage.clear()))
  }
  if (opts.sessionStorage) {
    promises.push(page.evaluate(() => sessionStorage.clear()))
  }

  const client = await page.target().createCDPSession()
  if (opts.cookies) {
    promises.push(client.send('Network.clearBrowserCookies'))
  }
  if (opts.cache) {
    promises.push(client.send('Network.clearBrowserCache'))
  }

  await Promise.all(promises)
}
