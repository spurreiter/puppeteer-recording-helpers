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
export function openBrowser(options: PuppeteerLaunchOptions, timeout?: number | undefined): Promise<{
    browser: Browser;
    page: Page;
    timeout: number;
}>;
export type PuppeteerLaunchOptions = import('puppeteer').PuppeteerLaunchOptions;
export type Browser = import('puppeteer').Browser;
export type Page = import('puppeteer').Page;
