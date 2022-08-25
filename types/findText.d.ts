/** @typedef {import('puppeteer').ElementHandle} ElementHandle */
/** @typedef {import('puppeteer').Page} Page */
/**
 * Find text in page
 * @param {Page} page
 * @param {string} text
 * @param {string} [xpath='//*'] See https://devhints.io/xpath
 * @returns {Promise<ElementHandle>}
 */
export function findText(page: Page, text: string, xpath?: string | undefined): Promise<ElementHandle>;
export type ElementHandle = import('puppeteer').ElementHandle;
export type Page = import('puppeteer').Page;
