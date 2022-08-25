/** @typedef {import('puppeteer').Browser} Browser */
/** @typedef {import('puppeteer').Page} Page */
/**
 * Opens a new tab
 * @param {Browser} browser
 * @param {number} [timeout=5000]
 * @returns {Promise<Page>}
 */
export function openTab(browser: Browser, timeout?: number | undefined): Promise<Page>;
export type Browser = import('puppeteer').Browser;
export type Page = import('puppeteer').Page;
