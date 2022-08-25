import { findElements } from './findElements.js'

/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('puppeteer').Page} Page */

/**
 * Find text in page
 * @param {Page} page
 * @param {string} text
 * @param {string} [xpath='//*'] See https://devhints.io/xpath
 * @returns {Promise<ElementHandle>}
 */
export function findText (page, text, xpath = '//*') {
  const search = `${xpath}[contains(text(), '${text.replace(/[']/g, "\\'")}')]`
  return findElements(page, search)
}
