/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('puppeteer').Page} Page */
/**
 * Find elements using either CSS Selectors or xPath
 * Will NOT throw if element was not found in page
 * @param {Page} page
 * @param {string} [xpathOrSelector='//*'] See https://devhints.io/xpath supports xpath as well as css selectors
 * @returns {Promise<ElementHandle>}
 */
export function findElements(page: Page, xpathOrSelector?: string | undefined): Promise<ElementHandle>;
export type ElementHandle = import('puppeteer').ElementHandle;
export type Page = import('puppeteer').Page;
