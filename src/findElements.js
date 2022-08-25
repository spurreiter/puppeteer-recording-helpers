/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('puppeteer').Page} Page */

/**
 * Find elements using either CSS Selectors or xPath
 * Will NOT throw if element was not found in page
 * @param {Page} page
 * @param {string} [xpathOrSelector='//*'] See https://devhints.io/xpath supports xpath as well as css selectors
 * @returns {Promise<ElementHandle>}
 */
export function findElements (page, xpathOrSelector = '//*') {
  if (xpathOrSelector[0] === '/') {
    // @ts-expect-error
    return page.$x(xpathOrSelector)
  } else {
    // @ts-expect-error
    return page.$$(xpathOrSelector)
  }
}
